import { Body, Controller, Patch, Post, ServiceUnavailableException } from '@nestjs/common';
import { Decimal128 } from 'bson';
import * as moment from 'moment';

// Schemas
import { DetalleFactura, FacturaProveedor, FacturaProveedorDocument, ImpuestoFactura, LogFactura } from './factura-proveedor.schema';
import { FacturaProveedorOld } from './old/factura-proveedor-old.schema';

// DTOs
import { CreateFacturaProveedorDto } from '../dto/factura-proveedor.dto';

// Services
import { FacturaProveedorService } from './factura-proveedor.service';
import { FacturaProveedorOldService } from './old/factura-proveedor.service';
import { Type } from 'class-transformer';

@Controller('factura_proveedores')
export class FacturaProveedorController {

  constructor (
    private facturaProveedorService: FacturaProveedorService,
    private facturaProveedorOldService: FacturaProveedorOldService
  ) {}

  @Patch('/migrate')
  async migrateFromOld(): Promise<{[key:string]: any}> {
    // Mensaje de retorno del request
    let rtnMessage = {};  // mensaje de retorno
    let docsInsertados = 0;  // cantidad de registros guardados en la base de datos
    const docsConError = [];  // informe de las facturas que NO pudieron ser grabadas en la base de datos
    const newDocs: FacturaProveedor[] = [];
    
    const oldDocs = await this.facturaProveedorOldService.findAll()
      .catch(error => {
        console.log('*** ERROR facturaProveedorOld:', error);
        throw new ServiceUnavailableException(error);
      });

    if (oldDocs.length > 0) {

      // Procesar todas las facturas, generando las facturas al nuevo formato
      oldDocs.forEach((factura) => {
        newDocs.push(this.mapNewDoc(factura));
      });

      // Grabar las facturas
      for (const factura of newDocs) {
        await this.facturaProveedorService.addFacturaProveedor(factura)
          .then(() => {
            docsInsertados += 1;
          })
          .catch((error) => {
            docsConError.push({
              migrationId: factura.migration_id,
              proveedor: factura.proveedorDesc,
              fechaDoc: factura.fechaDoc,
              docNro: factura.numeroFactura,
              error: error.message
            })
          });
      };

      // Devolver el resultado
      rtnMessage = {
        message: `Migración completada. Se agregaron ${docsInsertados} facturas.`,
        errors: docsConError
      };

    } else {
      rtnMessage = {
        message: 'No hay facturas que migrar en la base de datos de Juan Carta.',
        errors: docsConError
      };
    }
    return rtnMessage;
  }

  // Alta de facturas
  @Post()
  async addFactura(@Body() facturaProveedorDto: CreateFacturaProveedorDto ): Promise<FacturaProveedorDocument> {
    return await this.facturaProveedorService.addFacturaProveedor(facturaProveedorDto);
  }
  // Armar la cabecera de la nueva factura
  private mapNewDoc(factura: FacturaProveedorOld): FacturaProveedor {

    // Armar los Detalles Factura
    const detalleFactura: DetalleFactura[] = [];
    factura.detail.forEach((detalle, index) => {
      detalleFactura.push({
        posicion: index + 1,
        concepto: detalle.concept,
        descripcion: detalle.description,
        mesServicio: detalle.servicemonth,
        sapCentroCostoId: detalle.costcenter.split(/\:/)[0],
        sapCentroCostoDesc: detalle.costcenter.split(/\:/)[1],
        sapCtaCtbleId: detalle.accountcode.split(/\:/)[0],
        sapCtaCtbleDesc: detalle.accountcode.split(/\:/)[1],
        sapOrden: detalle.order,
        itemNeto: +this.validateNumber(detalle.amount_item),//Decimal128.fromString(this.validateNumber(detalle.amount_item)),
        sapTaxId: detalle.tax_percentage?.split(/\:/)[0],
        sapTaxDesc: detalle.tax_percentage?.split(/\:/)[1],
        itemIva: +this.validateNumber(detalle.tax_amount)//Decimal128.fromString(this.validateNumber(detalle.tax_amount)),
      });
    });

    // Armar los Impuestos Factura
    const impuestoFactura: ImpuestoFactura[] = [];
    factura.detailtax.forEach((impuesto, index) => {
      impuestoFactura.push({
        posicion: index + 1,
        sapTaxId: impuesto.taxcode?.split(/\:/)[0],
        sapTaxDesc: impuesto.taxcode?.split(/\:/)[1],
        totalImpuesto: +this.validateNumber(impuesto.taxamount)//Decimal128.fromString(this.validateNumber(impuesto.taxamount)),
      });
    });

    // Armar los Logs Factura
    const logFactura: LogFactura[] = [];
    factura.general_log.forEach((gralLog) => {
      logFactura.push({
        fechaLog: moment(gralLog.update_date, 'lll').toDate(),
        statusLog: this.toLogStatus(gralLog.action),
        userLog: gralLog.description?.split(/\:/)[1]
      });
    });

    // Armar la factura
    const newFactura: FacturaProveedor = {
      empresaId: factura.company.split(/\:/)[0],
      empresaDesc: factura.company.split(/\:/)[1].trim(),
      proveedorId: factura.supplier.split(/\:/)[0],
      proveedorDesc: factura.supplier.split(/\:/)[1].trim(),
      fechaDoc: moment(factura.documentdate, 'YYYY-MM-DD').toDate(),
      fechaCtble: this.validateFecha(factura.accountingdate, null),// moment(factura.accountingdate, 'YYYY-MM-DD').toDate(),
      sapCbteId: factura.documenttype.split(/\:/)[0],
      sapCbteDesc: factura.documenttype.split(/\:/)[1].trim(),
      numeroFactura: factura.documentnumber,
      monedaDoc: factura.currency,
      monedaCotiz: +this.validateNumber(factura.exchangerate), //Decimal128.fromString(this.validateNumber(factura.exchangerate)),
      totalNeto: +this.validateNumber(factura.netamountinvoice), //Decimal128.fromString(this.validateNumber(factura.netamountinvoice)),
      sapDocId: factura.sap_id,
      sapDocFecha: this.validateFecha(factura.sap_date, ' @'), //moment(factura.sap_date?.split(' @')[0], 'YYYY-MM-dd').toDate(),
      areaAprobadoraId: factura.approvalarea.split(/\:/)[0],
      areaAprobadoraDesc: factura.approvalarea.split(/\:/)[1].trim(),
      docStatus: this.toDocStatus(factura.sap_status),
      detalle: detalleFactura,
      impuestos: impuestoFactura,
      log: logFactura,
      migration_id: factura._id
    };

    return newFactura;
  }

  // Validar el campo numérico que viene como string
  private validateNumber(value: string | undefined | null): string {
    if (value === undefined || value === null || value.trim() === '') {
      return '0';
    } else {
      // Quitar caracteres de más
      return value.replace(/\$/g, '').replace(/,/g, '').trim();
    }
  }

  // Convertir el statusLog de Logs Factura
  private toLogStatus(action: string): string {
    switch (action) {
      case 'Aprobado':
        return 'APROBADA';
      case 'Creada':
        return 'CREADA';
      case 'Rechazado':
        return 'RECHAZADA';
      case 'Rechazado':
        return 'RECHAZADA';
      default:
        return 'MODIFICADA';
    };
  }

  // Convertir el docStatus de la Factura
  private toDocStatus(action: string): string {
    switch (action) {
      case 'PENDIENTE':
        return 'EN_APROBACION';
      case 'ENVIADA A SAP':
        return 'EN_SAP';
      default:
        return 'EN_CARGA';
    };
  }

  // Validar fecha
  private validateFecha(value: string | undefined | null, separator: string | null): Date {
    if (value === undefined || value === null || value.trim() === '') {
      return null;
    } else {
      // Quitar caracteres de más
      return moment(value.split(separator)[0], 'YYYY-MM-dd').toDate();
    }
  }

}
