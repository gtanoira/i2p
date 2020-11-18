import { Body, Controller, Get, HttpCode, NotFoundException, Param, Patch, Post, Res, ServiceUnavailableException } from '@nestjs/common';
import * as moment from 'moment';

// import * as fs from 'file-system';
// import { fs } from 'file-system';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('file-system');

//Decorators
import { GetToken } from 'src/common/get-token.decorator';
// Pipes
import { ValidateTokenPipe } from 'src/common/validate-token.pipe';
// Environment
import { PUBLIC_PATH, PUBLIC_URL } from 'src/environment/environment.settings';
// Schemas & Models
import { DetalleFactura, FacturaProveedor, FacturaProveedorDocument, ImpuestoFactura, LogFactura } from './factura-proveedor.schema';
import { FacturaProveedorOld } from './old/factura-proveedor-old.schema';
import { UserAuth } from 'src/models/user-auth.model';
// DTOs
import { CreateFacturaProveedorDto } from '../dto/factura-proveedor.dto';
// Services
import { FacturaProveedorService } from './factura-proveedor.service';
import { FacturaProveedorOldService } from './old/factura-proveedor.service';
import { Types } from 'mongoose';
import { Response } from 'supertest';
import { Resolver } from 'dns';

@Controller('factura_proveedores')
export class FacturaProveedorController {

  constructor (
    private facturaProveedorService: FacturaProveedorService,
    private facturaProveedorOldService: FacturaProveedorOldService
  ) {}

  @Patch('/migrate')
  async migrateFromOld(
    @GetToken(new ValidateTokenPipe()) infoUser: UserAuth
  ): Promise<{[key:string]: any}> {

    // Variables
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
  @HttpCode(200)
  async addFactura(
    @GetToken(new ValidateTokenPipe()) infoUser: UserAuth,  
    @Body() facturaProveedorDto: CreateFacturaProveedorDto
  ): Promise<FacturaProveedorDocument> {
    return await this.facturaProveedorService.addFacturaProveedor(facturaProveedorDto);
  }

  // Traer todas las facturas
  @Get()
  async getAll(
    @GetToken(new ValidateTokenPipe()) infoUser: UserAuth
  ): Promise<FacturaProveedor[]> {
    return await this.facturaProveedorService.findAll();
  }

  // Show Pdf File
  @Get('/pdf/:fileName')
  public getPdfFile(
    //@GetToken(new ValidateTokenPipe()) infoUser: UserAuth,
    @Param('fileName') fileName: string,
    @Res() res
  ): void {

    const fileRead = new Promise((resolve, reject) => {
      fs.readFile(`${PUBLIC_PATH}/pdf/${fileName}`, (err, file) => {
        if (err) {
          reject(`Archivo inexistente: ${fileName}`);
        } else {          
          const stat = fs.statSync(`${PUBLIC_PATH}/pdf/${fileName}`);
          res.setHeader('Content-Length', stat.size);
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
          resolve(file);
          // res.send(file);
        };
      });
    });

    fileRead
      .then(pdfFile => {
        res.send(pdfFile);
      })
      .catch(error => {
        // El archivo no existe
        console.log('*** err', error);
        res.status(404).send({
          statusCode: 404,
          message: error,
          error: "Not found"
        });
        //Promise.reject(new NotFoundException(error));    //`Archivo inexistente: ${fileName}`);
      })
  }

  // Armar el documento con el nuevo formato
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

    // Salvar el PDF asociado al doc en el disco
    const pdfName = `${factura.supplier.split(/\:/)[0]}_${factura.accountingdate}_${factura.documentnumber}.pdf`;
    this.savePdfFile(factura._id, pdfName);

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
      pdfFile: pdfName,
      detalle: detalleFactura,
      impuestos: impuestoFactura,
      log: logFactura,
      migration_id: factura._id
    };

    return newFactura;
  }

  // Salvar los PDFs de la base Mongo al directorio /PUBLIC/PDF
  private savePdfFile(id: Types.ObjectId, fileName: string): void {

    this.facturaProveedorOldService.getPdfFile(id)
      .then(pdfFile => {
        if (pdfFile !== null) {
          // const data = Buffer.from(pdfFile);
          fs.writeFile(`${PUBLIC_PATH}/pdf/${fileName}`, pdfFile.buffer, (err: {[key: string]: any}) => {
            if (err) {
              console.log(`*** File PDF save error: _id ${id}`, err);
            }
          })
        }
      })
      .catch((error) => {
        console.log(`*** fs.getPdfFile (read error): _id: ${id}`, error);
      });
      
    return;
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
