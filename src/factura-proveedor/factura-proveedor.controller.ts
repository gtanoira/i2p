import { Controller, Patch, ServiceUnavailableException } from '@nestjs/common';
import { Decimal128 } from 'bson';
import moment from 'moment';

// Schemas
import { DetalleFactura, FacturaProveedor, ImpuestoFactura, LogFactura } from './factura-proveedor.schema';
import { FacturaProveedorOld } from './old/factura-proveedor-old.schema';

// Models
import { DocStatus, LogFacturaStatus } from 'src/models/constantes.model';

// Services
import { FacturaProveedorService } from './factura-proveedor.service';
import { FacturaProveedorOldService } from './old/factura-proveedor.service';

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
          .then(() => { docsInsertados += 1; })
          .catch(() => { 
            docsConError.push({
              migrationId: factura.migration_id,
              proveedor: factura.proveedorDesc,
              fechaDoc: factura.fechaDoc,
              docNro: factura.numeroFactura
            })
          });
      };

      // Devolver el resultado
      rtnMessage = {
        message: `Migración completada. Se agregaron ${docsInsertados} facturas.`,
        errors: docsConError
      };

      /* const enviarFactura = async (factura: FacturaProveedor): Promise<number> => {
        return await this.facturaProveedorService.addFacturaProveedor(factura)
          .then(() => { return 1; })
          .catch(() => { return Promise.reject(`${factura.migration_id}`) });
      };
      const resultadoEnviar: Iterable<Promise<number>> = newDocs.forEach(async factura => {
        return enviarFactura(factura)
          .then(data => docsInsertados += data)
          .catch();
      });
      Promise.all(resultadoEnviar)
        .then()
        .catch(); */

    } else {
      rtnMessage = {
        message: 'No hay facturas que migrar en la base de datos de Juan Carta.',
        errors: docsConError
      };
    }
    return rtnMessage;
  }

  // Armar la cabecera de la nueva factura}
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
        itemNeto: Decimal128.fromString(detalle.amount_item),
        sapTaxId: detalle.tax_percentage.split(/\:/)[0],
        sapTaxDesc: detalle.tax_percentage.split(/\:/)[1],
        itemIva: Decimal128.fromString(detalle.tax_amount)
      });
    });

    // Armar los Impuestos Factura
    const impuestoFactura: ImpuestoFactura[] = [];
    factura.detailtax.forEach((impuesto, index) => {
      impuestoFactura.push({
        posicion: index + 1,
        sapTaxId: impuesto.taxcode.split(/\:/)[0],
        sapTaxDesc: impuesto.taxcode.split(/\:/)[1],
        totalImpuesto: Decimal128.fromString(impuesto.taxamount)
      });
    });

    // Armar los Logs Factura
    const logFactura: LogFactura[] = [];
    factura.general_log.forEach((gralLog) => {
      logFactura.push({
        fechaLog: moment(gralLog.update_date, 'lll').toDate(),
        statusLog: this.toLogStatus(gralLog.action),
        userLog: gralLog.description.split(/\:/)[1]
      });
    });

    // Armar la factura
    const newFactura: FacturaProveedor = {
      empresaId: factura.company.split(/\:/)[0],
      empresaDesc: factura.company.split(/\:/)[1],
      proveedorId: factura.supplier.split(/\:/)[0],
      proveedorDesc: factura.supplier.split(/\:/)[1],
      fechaDoc: moment(factura.documentdate, 'YYYY-MM-DD').toDate(),
      fechaCtble: moment(factura.accountingdate, 'YYYY-MM-DD').toDate(),
      sapCbteId: factura.documenttype.split(/\:/)[0],
      sapCbteDesc: factura.documenttype.split(/\:/)[1],
      numeroFactura: factura.documentnumber,
      monedaDoc: factura.currency,
      monedaCotiz: Decimal128.fromString(factura.exchangerate),
      totalNeto: Decimal128.fromString(factura.netamountinvoice.replace(' $', '')),
      sapDocId: factura.sap_id,
      sapDocFecha: moment(factura.sap_date.split(' @')[0], 'YYYY-MM-dd').toDate(),
      areaAprobadoraId: factura.approvalarea.split(/\:/)[0],
      areaAprobadoraDesc: factura.approvalarea.split(/\:/)[1],
      docStatus: this.toDocStatus(factura.sap_status),
      detalle: detalleFactura,
      impuestos: impuestoFactura,
      log: logFactura,
      migration_id: factura._id
    };

    return newFactura;
  }

  // Convertir el statusLog de Logs Factura
  private toLogStatus(action: string): LogFacturaStatus {
    switch (action) {
      case 'Aprobado':
        return LogFacturaStatus.APROBADA;
      case 'Creada':
        return LogFacturaStatus.CREADA;
      case 'Rechazado':
        return LogFacturaStatus.RECHAZADA;
      case 'Rechazado':
        return LogFacturaStatus.RECHAZADA;
      default:
        return LogFacturaStatus.MODIFICADA;
    };
  }

  // Convertir el docStatus de la Factura
  private toDocStatus(action: string): DocStatus {
    switch (action) {
      case 'PENDIENTE':
        return DocStatus.EN_APROBACION;
      case 'ENVIADA A SAP':
        return DocStatus.EN_SAP;
      default:
        return DocStatus.EN_CARGA;
    };
  }
}
