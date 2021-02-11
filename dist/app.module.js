"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const environment_settings_1 = require("./environment/environment.settings");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const authorizations_service_1 = require("./shared/authorizations.service");
const area_aprobadora_module_1 = require("./area-aprobadora/area-aprobadora.module");
const factura_proveedor_module_1 = require("./factura-proveedor/factura-proveedor.module");
const sociedad_module_1 = require("./sociedad/sociedad.module");
const connOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    bufferCommands: true
};
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forRoot(environment_settings_1.I2P_DBASE, Object.assign({ connectionName: 'i2p_dbase' }, connOptions)),
            mongoose_1.MongooseModule.forRoot(environment_settings_1.I2P_OLD, Object.assign({ connectionName: 'i2p_old' }, connOptions)),
            area_aprobadora_module_1.AreaAprobadoraModule,
            factura_proveedor_module_1.FacturaProveedorModule,
            common_1.HttpModule,
            sociedad_module_1.SociedadModule
        ],
        controllers: [
            app_controller_1.AppController
        ],
        providers: [
            app_service_1.AppService,
            authorizations_service_1.AuthorizationsService
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map