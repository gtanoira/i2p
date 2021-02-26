/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  ServiceUnavailableException,
  UploadedFile,
  UseInterceptors,
  ValidationPipe
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { Types } from 'mongoose';
import * as moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('file-system');

// Constant
import { oneFileMemoryMulterOptions } from './one-file-opts.multer';
//Decorators
import { GetToken } from 'src/common/get-token.decorator';
// Pipes
import { ValidateTokenPipe } from 'src/common/validate-token.pipe';
// Environment
import { PUBLIC_PATH } from 'src/environment/environment.settings';
// Schemas & Models
import { DetalleFactura, FacturaProveedor, FacturaProveedorDocument, FacturaProveedorToResponse, ImpuestoFactura, LogFactura } from './factura-proveedor.schema';
import { FacturaProveedorOld } from './old/factura-proveedor-old.schema';
import { UserAuth } from 'src/models/user-auth.model';
// DTOs
import { CreateFacturaProveedorDto } from '../dto/factura-proveedor.dto';
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
  // @UseInterceptors(FileInterceptor('pdfFile'))
  async addFactura(
    @GetToken(new ValidateTokenPipe()) infoUser: UserAuth,  
    @Body(new ValidationPipe()) facturaProveedorDto: CreateFacturaProveedorDto
    // @UploadedFile() pdfFile
  ): Promise<{[key:string]: any}> {
    // Crear un LOG
    const newLog: LogFactura = {
      fechaLog: moment().toDate(),
      userLog: `${infoUser.user}${infoUser.isSuperUser() ? ' (SUPERUSER)' : ''}`,
      statusLog: 'CREADA',
      description: 'Se creó una nueva factura.'
    };
    const newFactura = { ...facturaProveedorDto, log: [newLog] };
    return await this.facturaProveedorService.addFacturaProveedor(newFactura)
    .then(factura => {
      return {
        _id: factura._id,
        message: "factura creada con éxito."
      }
    });
  }

  // Agregar el PDF a una factura y activar la misma para el proceso de aprobaciones
  @Patch('/:id/pdf')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('pdfFile', oneFileMemoryMulterOptions))
  async addFileToFactura(
    @GetToken(new ValidateTokenPipe()) infoUser: UserAuth,
    @Param('id') id: string,
    @UploadedFile() pdfFile: Express.Multer.File
  ): Promise<{[key:string]: any}> {

    let rtnMessage: {[key:string]: any} = {};

    // Verificar que exista el documento :id y leer el documento
    const factura = await this.facturaProveedorService.findOne(id)
    .then(data => {
      return data;
    })
    .catch(() => {
      throw new BadRequestException(`API-0048(E): id inexsitente (${id})`);
    });
    
    if (factura == null) {
      throw new BadRequestException(`API-0048(E): id inexsitente (${id})`);
    } else {
      // Chequear el status de la factura
      if (`CREADA,MODIFICADA`.indexOf(factura.docStatus) < 0) {
        throw new ConflictException(`API-0050(E): el status de la factura no permite esta operación (status: ${factura.docStatus}).`);
      } else {
        // Armar el nombre de archivo
        const fileName = `${factura.proveedorId}_${factura.fechaCtble.toISOString().split('T')[0]}_${factura.numeroFactura.trim()}.pdf`;
        // Guardar el aarchivo en PUBLIC y actualizar la factura.
        fs.writeFile(`${PUBLIC_PATH}/pdf/${fileName}`, pdfFile.buffer, (err: {[key: string]: any}) => {
          if (err) {
            throw new ServiceUnavailableException(`API-0049(E): no se pudo salvar el PDF para el id: ${id} (${err.message})`);
          }
        });
        // Actualizar la factura
        const toUpdate = {
          pdfFile: fileName,
          docStatus: factura.docStatus === 'CREADA' ? 'EN_PROCESO' : factura.docStatus
        };

        // Crear LOG
        const newLog: LogFactura = {
          userLog: `${infoUser.user}${infoUser.isSuperUser() ? ' (SUPERUSER)' : ''}`,
          fechaLog: moment().toDate(),
          statusLog: factura.docStatus === 'CREADA' ? 'EN_PROCESO' : factura.docStatus,
          description: 'Se actualizó el archivo PDF de la factura.'
        };
        toUpdate['log'] = [ ...factura.log, newLog ];

        // Grabar
        await this.facturaProveedorService.patchFacturaProveedor(id, toUpdate)
        .then( data => {
          rtnMessage = {
            _id: id,
            pdfFile: fileName,
            message: 'El PDF fue guardado con éxito.'
          };
        })
        .catch(error => {
          throw new ServiceUnavailableException(error);
        });
      }
      return rtnMessage;
    }
  }

  // Devolver la cantidad de facturas existentes en la BDatos
  @Get('/count')
  async countFacturas(
    @GetToken(new ValidateTokenPipe()) infoUser: UserAuth,
  ): Promise<number> {
    return await this.facturaProveedorService.countFacturas(infoUser);
  }

  // Obtener facturas
  @Get([
    '/'
  ])
  async getAll(
    @GetToken(new ValidateTokenPipe()) infoUser: UserAuth,
    @Query('page_no') pageNo: number,
    @Query('recs_page') recsPage: number,
    @Query('sort_field') sortField: string,
    @Query('sort_direction') sortDirection: string,
    @Req() req  
  ): Promise<FacturaProveedorToResponse> {
    console.log(`${req.method} ${req.url}`);
    // Obtener la cantidad de facturas
    let totRecords = 0;
    await this.facturaProveedorService.countFacturas(infoUser)
      .then(count => totRecords = count).catch(() => totRecords = 0);
    console.log('*** totFacturas:', totRecords);
    // Obtener las facturas
    return await this.facturaProveedorService.getRecords({
      infoUser,
      pageNo: pageNo && pageNo > 0 ? pageNo : 1,
      recsPage: recsPage && recsPage > 0 ? recsPage : 10000,
      sortField: sortField ? sortField : '',
      sortDirection: sortDirection && 'asc,desc'.indexOf(sortDirection.toLowerCase()) >= 0 ? sortDirection.toUpperCase() : 'ASC'
    })
    .then(data => {
      return {
        totalFacturas: totRecords,
        facturas: data
      };
    })
    .catch(error => {
      console.log(error);
      throw new ServiceUnavailableException({'message': error.message});
    });
  }

  // Show Pdf File
  @Get('/:id/pdf')
  public async getPdfFile(
    @GetToken(new ValidateTokenPipe()) infoUser: UserAuth,
    @Param('id') id: string,
    @Res() res
  ): Promise<void> {

    // Buscar la factura por :id
    await this.facturaProveedorService.findOne(id)
    .then(async factura => {

      const fileRead = new Promise((resolve, reject) => {
        fs.readFile(`${PUBLIC_PATH}/pdf/${factura.pdfFile}`, (err, file) => {
          if (err) {
            reject(`Archivo inexistente: ${factura.pdfFile}`);
          } else {          
            const stat = fs.statSync(`${PUBLIC_PATH}/pdf/${factura.pdfFile}`);
            res.setHeader('Content-Length', stat.size);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=${factura.pdfFile}`);
            resolve(file);
            // res.send(file);
          };
        });
      });
  
      await fileRead
      .then(pdfFile => {
        res.send(pdfFile);
      })
      .catch(error => {
        // El archivo no existe
        res.status(404).send({
          statusCode: 404,
          message: error,
          error: "Not found"
        });
        //Promise.reject(new NotFoundException(error));    //`Archivo inexistente: ${fileName}`);
      })
    })
    .catch((error) => {
      throw new BadRequestException(`API-0048(E): id inexsitente (${id})`);
    });
  }

  // Armar el documento con el nuevo formato
  private mapNewDoc(factura: FacturaProveedorOld): FacturaProveedor {

    // Armar los Detalles Factura
    const detalleFactura: DetalleFactura[] = [];
    factura.detail.forEach((detalle) => {
      detalleFactura.push({
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
    factura.detailtax.forEach((impuesto) => {
      impuestoFactura.push({
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

  // Convertir el statusLog de cada Logs Factura
  private toLogStatus(action: string): string {
    switch (action) {
      case 'Aprobado':
        return 'APROBADA';
      case 'Creada':
        return 'CREADA';
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
        return 'EN_PROCESO';
      case 'ENVIADA A SAP':
        return 'ENVIADA_SAP';
      default:
        return 'EN_PROCESO';
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
