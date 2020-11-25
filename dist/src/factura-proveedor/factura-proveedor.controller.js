"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacturaProveedorController = void 0;
const common_1 = require("@nestjs/common");
const file_interceptor_1 = require("@nestjs/platform-express/multer/interceptors/file.interceptor");
const moment = require("moment");
const fs = require('file-system');
const one_file_opts_multer_1 = require("./one-file-opts.multer");
const get_token_decorator_1 = require("src/common/get-token.decorator");
const validate_token_pipe_1 = require("src/common/validate-token.pipe");
const environment_settings_1 = require("src/environment/environment.settings");
const user_auth_model_1 = require("src/models/user-auth.model");
const factura_proveedor_dto_1 = require("../dto/factura-proveedor.dto");
const factura_proveedor_service_1 = require("./factura-proveedor.service");
const factura_proveedor_service_2 = require("./old/factura-proveedor.service");
let FacturaProveedorController = class FacturaProveedorController {
    constructor(facturaProveedorService, facturaProveedorOldService) {
        this.facturaProveedorService = facturaProveedorService;
        this.facturaProveedorOldService = facturaProveedorOldService;
    }
    async migrateFromOld(infoUser) {
        let rtnMessage = {};
        let docsInsertados = 0;
        const docsConError = [];
        const newDocs = [];
        const oldDocs = await this.facturaProveedorOldService.findAll()
            .catch(error => {
            console.log('*** ERROR facturaProveedorOld:', error);
            throw new common_1.ServiceUnavailableException(error);
        });
        if (oldDocs.length > 0) {
            oldDocs.forEach((factura) => {
                newDocs.push(this.mapNewDoc(factura));
            });
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
                    });
                });
            }
            ;
            rtnMessage = {
                message: `Migración completada. Se agregaron ${docsInsertados} facturas.`,
                errors: docsConError
            };
        }
        else {
            rtnMessage = {
                message: 'No hay facturas que migrar en la base de datos de Juan Carta.',
                errors: docsConError
            };
        }
        return rtnMessage;
    }
    async addFactura(infoUser, facturaProveedorDto) {
        const newLog = {
            fechaLog: moment().toDate(),
            userLog: `${infoUser.user}${infoUser.isSuperUser() ? ' (SUPERUSER)' : ''}`,
            statusLog: 'CREADA',
            description: 'Se creó una nueva factura.'
        };
        const newFactura = Object.assign(Object.assign({}, facturaProveedorDto), { log: [newLog] });
        return await this.facturaProveedorService.addFacturaProveedor(newFactura)
            .then(factura => {
            return {
                _id: factura._id,
                message: "factura creada con éxito."
            };
        });
    }
    async addFileToFactura(infoUser, id, pdfFile) {
        let rtnMessage = {};
        const factura = await this.facturaProveedorService.findOne(id)
            .then(data => {
            return data;
        })
            .catch(() => {
            throw new common_1.BadRequestException(`API-0048(E): id inexsitente (${id})`);
        });
        if (factura == null) {
            throw new common_1.BadRequestException(`API-0048(E): id inexsitente (${id})`);
        }
        else {
            if (`CREADA,MODIFICADA`.indexOf(factura.docStatus) < 0) {
                throw new common_1.ConflictException(`API-0050(E): el status de la factura no permite esta operación (status: ${factura.docStatus}).`);
            }
            else {
                const fileName = `${factura.proveedorId}_${factura.fechaCtble.toISOString().split('T')[0]}_${factura.numeroFactura.trim()}.pdf`;
                fs.writeFile(`${environment_settings_1.PUBLIC_PATH}/pdf/${fileName}`, pdfFile.buffer, (err) => {
                    if (err) {
                        throw new common_1.ServiceUnavailableException(`API-0049(E): no se pudo salvar el PDF para el id: ${id} (${err.message})`);
                    }
                });
                const toUpdate = {
                    pdfFile: fileName,
                    docStatus: factura.docStatus === 'CREADA' ? 'EN_PROCESO' : factura.docStatus
                };
                const newLog = {
                    userLog: `${infoUser.user}${infoUser.isSuperUser() ? ' (SUPERUSER)' : ''}`,
                    fechaLog: moment().toDate(),
                    statusLog: factura.docStatus === 'CREADA' ? 'EN_PROCESO' : factura.docStatus,
                    description: 'Se actualizó el archivo PDF de la factura.'
                };
                toUpdate['log'] = [...factura.log, newLog];
                await this.facturaProveedorService.patchFacturaProveedor(id, toUpdate)
                    .then(data => {
                    rtnMessage = {
                        _id: id,
                        pdfFile: fileName,
                        message: 'El PDF fue guardado con éxito.'
                    };
                })
                    .catch(error => {
                    throw new common_1.ServiceUnavailableException(error);
                });
            }
            return rtnMessage;
        }
    }
    async countFacturas(infoUser) {
        return await this.facturaProveedorService.countFacturas();
    }
    async getPdfFile(infoUser, id, res) {
        await this.facturaProveedorService.findOne(id)
            .then(async (factura) => {
            const fileRead = new Promise((resolve, reject) => {
                fs.readFile(`${environment_settings_1.PUBLIC_PATH}/pdf/${factura.pdfFile}`, (err, file) => {
                    if (err) {
                        reject(`Archivo inexistente: ${factura.pdfFile}`);
                    }
                    else {
                        const stat = fs.statSync(`${environment_settings_1.PUBLIC_PATH}/pdf/${factura.pdfFile}`);
                        res.setHeader('Content-Length', stat.size);
                        res.setHeader('Content-Type', 'application/pdf');
                        res.setHeader('Content-Disposition', `attachment; filename=${factura.pdfFile}`);
                        resolve(file);
                    }
                    ;
                });
            });
            await fileRead
                .then(pdfFile => {
                res.send(pdfFile);
            })
                .catch(error => {
                res.status(404).send({
                    statusCode: 404,
                    message: error,
                    error: "Not found"
                });
            });
        })
            .catch((error) => {
            throw new common_1.BadRequestException(`API-0048(E): id inexsitente (${id})`);
        });
    }
    async getAll(infoUser, params) {
        const page = params.page ? params.page : 0;
        const recsPerPage = params.recsPerPage ? params.recsPerPage : 0;
        return await this.facturaProveedorService.findAll(page, recsPerPage);
    }
    mapNewDoc(factura) {
        const detalleFactura = [];
        factura.detail.forEach((detalle) => {
            var _a, _b;
            detalleFactura.push({
                concepto: detalle.concept,
                descripcion: detalle.description,
                mesServicio: detalle.servicemonth,
                sapCentroCostoId: detalle.costcenter.split(/\:/)[0],
                sapCentroCostoDesc: detalle.costcenter.split(/\:/)[1],
                sapCtaCtbleId: detalle.accountcode.split(/\:/)[0],
                sapCtaCtbleDesc: detalle.accountcode.split(/\:/)[1],
                sapOrden: detalle.order,
                itemNeto: +this.validateNumber(detalle.amount_item),
                sapTaxId: (_a = detalle.tax_percentage) === null || _a === void 0 ? void 0 : _a.split(/\:/)[0],
                sapTaxDesc: (_b = detalle.tax_percentage) === null || _b === void 0 ? void 0 : _b.split(/\:/)[1],
                itemIva: +this.validateNumber(detalle.tax_amount)
            });
        });
        const impuestoFactura = [];
        factura.detailtax.forEach((impuesto) => {
            var _a, _b;
            impuestoFactura.push({
                sapTaxId: (_a = impuesto.taxcode) === null || _a === void 0 ? void 0 : _a.split(/\:/)[0],
                sapTaxDesc: (_b = impuesto.taxcode) === null || _b === void 0 ? void 0 : _b.split(/\:/)[1],
                totalImpuesto: +this.validateNumber(impuesto.taxamount)
            });
        });
        const logFactura = [];
        factura.general_log.forEach((gralLog) => {
            var _a;
            logFactura.push({
                fechaLog: moment(gralLog.update_date, 'lll').toDate(),
                statusLog: this.toLogStatus(gralLog.action),
                userLog: (_a = gralLog.description) === null || _a === void 0 ? void 0 : _a.split(/\:/)[1]
            });
        });
        const pdfName = `${factura.supplier.split(/\:/)[0]}_${factura.accountingdate}_${factura.documentnumber}.pdf`;
        this.savePdfFile(factura._id, pdfName);
        const newFactura = {
            empresaId: factura.company.split(/\:/)[0],
            empresaDesc: factura.company.split(/\:/)[1].trim(),
            proveedorId: factura.supplier.split(/\:/)[0],
            proveedorDesc: factura.supplier.split(/\:/)[1].trim(),
            fechaDoc: moment(factura.documentdate, 'YYYY-MM-DD').toDate(),
            fechaCtble: this.validateFecha(factura.accountingdate, null),
            sapCbteId: factura.documenttype.split(/\:/)[0],
            sapCbteDesc: factura.documenttype.split(/\:/)[1].trim(),
            numeroFactura: factura.documentnumber,
            monedaDoc: factura.currency,
            monedaCotiz: +this.validateNumber(factura.exchangerate),
            totalNeto: +this.validateNumber(factura.netamountinvoice),
            sapDocId: factura.sap_id,
            sapDocFecha: this.validateFecha(factura.sap_date, ' @'),
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
    savePdfFile(id, fileName) {
        this.facturaProveedorOldService.getPdfFile(id)
            .then(pdfFile => {
            if (pdfFile !== null) {
                fs.writeFile(`${environment_settings_1.PUBLIC_PATH}/pdf/${fileName}`, pdfFile.buffer, (err) => {
                    if (err) {
                        console.log(`*** File PDF save error: _id ${id}`, err);
                    }
                });
            }
        })
            .catch((error) => {
            console.log(`*** fs.getPdfFile (read error): _id: ${id}`, error);
        });
        return;
    }
    validateNumber(value) {
        if (value === undefined || value === null || value.trim() === '') {
            return '0';
        }
        else {
            return value.replace(/\$/g, '').replace(/,/g, '').trim();
        }
    }
    toLogStatus(action) {
        switch (action) {
            case 'Aprobado':
                return 'APROBADA';
            case 'Creada':
                return 'CREADA';
            case 'Rechazado':
                return 'RECHAZADA';
            default:
                return 'MODIFICADA';
        }
        ;
    }
    toDocStatus(action) {
        switch (action) {
            case 'PENDIENTE':
                return 'EN_PROCESO';
            case 'ENVIADA A SAP':
                return 'ENVIADA_SAP';
            default:
                return 'EN_PROCESO';
        }
        ;
    }
    validateFecha(value, separator) {
        if (value === undefined || value === null || value.trim() === '') {
            return null;
        }
        else {
            return moment(value.split(separator)[0], 'YYYY-MM-dd').toDate();
        }
    }
};
__decorate([
    common_1.Patch('/migrate'),
    __param(0, get_token_decorator_1.GetToken(new validate_token_pipe_1.ValidateTokenPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_auth_model_1.UserAuth]),
    __metadata("design:returntype", Promise)
], FacturaProveedorController.prototype, "migrateFromOld", null);
__decorate([
    common_1.Post(),
    common_1.HttpCode(200),
    __param(0, get_token_decorator_1.GetToken(new validate_token_pipe_1.ValidateTokenPipe())),
    __param(1, common_1.Body(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_auth_model_1.UserAuth,
        factura_proveedor_dto_1.CreateFacturaProveedorDto]),
    __metadata("design:returntype", Promise)
], FacturaProveedorController.prototype, "addFactura", null);
__decorate([
    common_1.Patch('/:id/pdf'),
    common_1.HttpCode(200),
    common_1.UseInterceptors(file_interceptor_1.FileInterceptor('pdfFile', one_file_opts_multer_1.oneFileMemoryMulterOptions)),
    __param(0, get_token_decorator_1.GetToken(new validate_token_pipe_1.ValidateTokenPipe())),
    __param(1, common_1.Param('id')),
    __param(2, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_auth_model_1.UserAuth, String, Object]),
    __metadata("design:returntype", Promise)
], FacturaProveedorController.prototype, "addFileToFactura", null);
__decorate([
    common_1.Get('/count'),
    __param(0, get_token_decorator_1.GetToken(new validate_token_pipe_1.ValidateTokenPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_auth_model_1.UserAuth]),
    __metadata("design:returntype", Promise)
], FacturaProveedorController.prototype, "countFacturas", null);
__decorate([
    common_1.Get('/:id/pdf'),
    __param(0, get_token_decorator_1.GetToken(new validate_token_pipe_1.ValidateTokenPipe())),
    __param(1, common_1.Param('id')),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_auth_model_1.UserAuth, String, Object]),
    __metadata("design:returntype", Promise)
], FacturaProveedorController.prototype, "getPdfFile", null);
__decorate([
    common_1.Get([
        '/',
        '/:page/:recsPerPage'
    ]),
    __param(0, get_token_decorator_1.GetToken(new validate_token_pipe_1.ValidateTokenPipe())),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_auth_model_1.UserAuth, Object]),
    __metadata("design:returntype", Promise)
], FacturaProveedorController.prototype, "getAll", null);
FacturaProveedorController = __decorate([
    common_1.Controller('factura_proveedores'),
    __metadata("design:paramtypes", [factura_proveedor_service_1.FacturaProveedorService,
        factura_proveedor_service_2.FacturaProveedorOldService])
], FacturaProveedorController);
exports.FacturaProveedorController = FacturaProveedorController;
//# sourceMappingURL=factura-proveedor.controller.js.map