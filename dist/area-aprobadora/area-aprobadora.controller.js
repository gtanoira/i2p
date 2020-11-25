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
exports.AreaAprobadoraController = void 0;
const common_1 = require("@nestjs/common");
const area_aprobadora_service_1 = require("./area-aprobadora.service");
const area_aprobadora_service_2 = require("./old/area-aprobadora.service");
const user_auth_model_1 = require("../models/user-auth.model");
const get_token_decorator_1 = require("../common/get-token.decorator");
const validate_token_pipe_1 = require("../common/validate-token.pipe");
let AreaAprobadoraController = class AreaAprobadoraController {
    constructor(areaAprobadoraService, areaAprobadoraOldService) {
        this.areaAprobadoraService = areaAprobadoraService;
        this.areaAprobadoraOldService = areaAprobadoraOldService;
    }
    async migrateFromOld(infoUser) {
        let rtnMessage = '';
        let docsInsertados = 0;
        const oldDocs = await this.areaAprobadoraOldService.findAll();
        if (oldDocs) {
            oldDocs.forEach(async (doc) => {
                const proveedores = [];
                if (doc.suppliers.length > 0) {
                    doc.suppliers.forEach(supplier => {
                        const proveedor = supplier.supplier.split(/\:/);
                        if (proveedor) {
                            proveedores.push({
                                sapId: proveedor[0],
                                name: proveedor[1]
                            });
                        }
                    });
                }
                const newDoc = {
                    id: doc.approvalarea,
                    name: doc.description,
                    proveedores
                };
                await this.areaAprobadoraService.addAreaAprobadora(newDoc)
                    .then(() => {
                    docsInsertados += 1;
                })
                    .catch(error => {
                    console.log('*** ERROR: ', error);
                    rtnMessage += `${newDoc.id}/${newDoc.name}, `;
                });
            });
            rtnMessage = rtnMessage === '' ? `Migración completada con éxito. Se migraron: ${docsInsertados} areas` : `Hubo errores: ${rtnMessage}`;
        }
        return { message: rtnMessage };
    }
    async findAll(infoUser) {
        return await this.areaAprobadoraService.findAll();
    }
};
__decorate([
    common_1.Patch('/migrate'),
    __param(0, get_token_decorator_1.GetToken(new validate_token_pipe_1.ValidateTokenPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_auth_model_1.UserAuth]),
    __metadata("design:returntype", Promise)
], AreaAprobadoraController.prototype, "migrateFromOld", null);
__decorate([
    common_1.Get(),
    __param(0, get_token_decorator_1.GetToken(new validate_token_pipe_1.ValidateTokenPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_auth_model_1.UserAuth]),
    __metadata("design:returntype", Promise)
], AreaAprobadoraController.prototype, "findAll", null);
AreaAprobadoraController = __decorate([
    common_1.Controller('area_aprobadoras'),
    __metadata("design:paramtypes", [area_aprobadora_service_1.AreaAprobadoraService,
        area_aprobadora_service_2.AreaAprobadoraOldService])
], AreaAprobadoraController);
exports.AreaAprobadoraController = AreaAprobadoraController;
//# sourceMappingURL=area-aprobadora.controller.js.map