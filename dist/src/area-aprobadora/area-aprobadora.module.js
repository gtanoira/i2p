"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaAprobadoraModule = void 0;
const common_1 = require("@nestjs/common");
const dist_1 = require("@nestjs/mongoose/dist");
const area_aprobadora_schema_1 = require("./area-aprobadora.schema");
const area_aprobadora_schema_2 = require("./old/area-aprobadora.schema");
const area_aprobadora_controller_1 = require("./area-aprobadora.controller");
const area_aprobadora_controller_2 = require("./old/area-aprobadora.controller");
const area_aprobadora_service_1 = require("./area-aprobadora.service");
const area_aprobadora_service_2 = require("./old/area-aprobadora.service");
let AreaAprobadoraModule = class AreaAprobadoraModule {
};
AreaAprobadoraModule = __decorate([
    common_1.Module({
        imports: [
            dist_1.MongooseModule.forFeature([
                { name: area_aprobadora_schema_1.AreaAprobadora.name, schema: area_aprobadora_schema_1.AreaAprobadoraSchema }
            ], 'i2p_dbase'),
            dist_1.MongooseModule.forFeature([
                { name: area_aprobadora_schema_2.AreaAprobadoraOld.name, schema: area_aprobadora_schema_2.AreaAprobadoraOldSchema }
            ], 'i2p_old'),
        ],
        controllers: [area_aprobadora_controller_1.AreaAprobadoraController, area_aprobadora_controller_2.AreaAprobadoraOldController],
        providers: [area_aprobadora_service_1.AreaAprobadoraService, area_aprobadora_service_2.AreaAprobadoraOldService]
    })
], AreaAprobadoraModule);
exports.AreaAprobadoraModule = AreaAprobadoraModule;
//# sourceMappingURL=area-aprobadora.module.js.map