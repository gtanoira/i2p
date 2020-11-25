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
exports.FacturaProveedorService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const factura_proveedor_schema_1 = require("./factura-proveedor.schema");
let FacturaProveedorService = class FacturaProveedorService {
    constructor(facturaProveedorModel) {
        this.facturaProveedorModel = facturaProveedorModel;
    }
    async addFacturaProveedor(factura) {
        return this.facturaProveedorModel.create(factura);
    }
    async countFacturas() {
        return this.facturaProveedorModel.count({});
    }
    async findAll(page, recsPerPage) {
        if (page === 0 || recsPerPage === 0) {
            return this.facturaProveedorModel.find().exec();
        }
        else {
            const pagina = (page - 1) * recsPerPage;
            console.log('*** skip, limit:', pagina, recsPerPage);
            return this.facturaProveedorModel.find().skip(pagina).limit(Math.abs(recsPerPage)).exec();
        }
    }
    async findOne(id) {
        return await this.facturaProveedorModel.findById(id).exec();
    }
    async patchFacturaProveedor(id, datosActualizar) {
        return await this.facturaProveedorModel.findOneAndUpdate({ _id: id }, { $set: datosActualizar }).exec();
    }
};
FacturaProveedorService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(factura_proveedor_schema_1.FacturaProveedor.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FacturaProveedorService);
exports.FacturaProveedorService = FacturaProveedorService;
//# sourceMappingURL=factura-proveedor.service.js.map