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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaAprobadoraOldController = void 0;
const common_1 = require("@nestjs/common");
const area_aprobadora_service_1 = require("./area-aprobadora.service");
let AreaAprobadoraOldController = class AreaAprobadoraOldController {
    constructor(areaAprobadoraOldService) {
        this.areaAprobadoraOldService = areaAprobadoraOldService;
    }
    async migrateReadAll() {
        return await this.areaAprobadoraOldService.findAll();
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AreaAprobadoraOldController.prototype, "migrateReadAll", null);
AreaAprobadoraOldController = __decorate([
    common_1.Controller('area_aprobadoras_old'),
    __metadata("design:paramtypes", [area_aprobadora_service_1.AreaAprobadoraOldService])
], AreaAprobadoraOldController);
exports.AreaAprobadoraOldController = AreaAprobadoraOldController;
//# sourceMappingURL=area-aprobadora.controller.js.map