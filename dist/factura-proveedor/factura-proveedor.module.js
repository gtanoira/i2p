"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacturaProveedorModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const factura_proveedor_schema_1 = require("./factura-proveedor.schema");
const factura_imagen_old_schema_1 = require("./old/factura-imagen-old.schema");
const factura_proveedor_old_schema_1 = require("./old/factura-proveedor-old.schema");
const factura_proveedor_controller_1 = require("./factura-proveedor.controller");
const factura_proveedor_controller_2 = require("./old/factura-proveedor.controller");
const factura_proveedor_service_1 = require("./factura-proveedor.service");
const factura_proveedor_service_2 = require("./old/factura-proveedor.service");
let FacturaProveedorModule = class FacturaProveedorModule {
};
FacturaProveedorModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: factura_proveedor_schema_1.FacturaProveedor.name, schema: factura_proveedor_schema_1.FacturaProveedorSchema }
            ], 'i2p_dbase'),
            mongoose_1.MongooseModule.forFeature([
                { name: factura_proveedor_old_schema_1.FacturaProveedorOld.name, schema: factura_proveedor_old_schema_1.FacturaProveedorOldSchema },
                { name: factura_imagen_old_schema_1.FacturaImagenOld.name, schema: factura_imagen_old_schema_1.FacturaImagenOldSchema }
            ], 'i2p_old')
        ],
        controllers: [
            factura_proveedor_controller_1.FacturaProveedorController,
            factura_proveedor_controller_2.FacturaProveedorOldController
        ],
        providers: [
            factura_proveedor_service_1.FacturaProveedorService,
            factura_proveedor_service_2.FacturaProveedorOldService
        ]
    })
], FacturaProveedorModule);
exports.FacturaProveedorModule = FacturaProveedorModule;
//# sourceMappingURL=factura-proveedor.module.js.map