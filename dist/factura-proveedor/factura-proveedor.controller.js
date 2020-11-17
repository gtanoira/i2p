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
const moment = require("moment");
const get_token_decorator_1 = require("../common/get-token.decorator");
const validate_token_pipe_1 = require("../common/validate-token.pipe");
const user_auth_model_1 = require("../models/user-auth.model");
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
        return await this.facturaProveedorService.addFacturaProveedor(facturaProveedorDto);
    }
    async getAll(infoUser) {
        return await this.facturaProveedorService.findAll();
    }
    mapNewDoc(factura) {
        const detalleFactura = [];
        factura.detail.forEach((detalle, index) => {
            var _a, _b;
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
                itemNeto: +this.validateNumber(detalle.amount_item),
                sapTaxId: (_a = detalle.tax_percentage) === null || _a === void 0 ? void 0 : _a.split(/\:/)[0],
                sapTaxDesc: (_b = detalle.tax_percentage) === null || _b === void 0 ? void 0 : _b.split(/\:/)[1],
                itemIva: +this.validateNumber(detalle.tax_amount)
            });
        });
        const impuestoFactura = [];
        factura.detailtax.forEach((impuesto, index) => {
            var _a, _b;
            impuestoFactura.push({
                posicion: index + 1,
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
            detalle: detalleFactura,
            impuestos: impuestoFactura,
            log: logFactura,
            migration_id: factura._id
        };
        return newFactura;
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
                return 'EN_APROBACION';
            case 'ENVIADA A SAP':
                return 'EN_SAP';
            default:
                return 'EN_CARGA';
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
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FacturaProveedorController.prototype, "migrateFromOld", null);
__decorate([
    common_1.Post(),
    common_1.HttpCode(200),
    __param(0, get_token_decorator_1.GetToken(new validate_token_pipe_1.ValidateTokenPipe())),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, factura_proveedor_dto_1.CreateFacturaProveedorDto]),
    __metadata("design:returntype", Promise)
], FacturaProveedorController.prototype, "addFactura", null);
__decorate([
    common_1.Get(),
    __param(0, get_token_decorator_1.GetToken(new validate_token_pipe_1.ValidateTokenPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FacturaProveedorController.prototype, "getAll", null);
FacturaProveedorController = __decorate([
    common_1.Controller('factura_proveedores'),
    __metadata("design:paramtypes", [factura_proveedor_service_1.FacturaProveedorService,
        factura_proveedor_service_2.FacturaProveedorOldService])
], FacturaProveedorController);
exports.FacturaProveedorController = FacturaProveedorController;
//# sourceMappingURL=factura-proveedor.controller.js.map