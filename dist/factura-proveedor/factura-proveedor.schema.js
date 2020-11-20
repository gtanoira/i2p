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
exports.FacturaProveedorSchema = exports.FacturaProveedor = exports.LogFactura = exports.ImpuestoFactura = exports.DetalleFactura = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const constantes_model_1 = require("../models/constantes.model");
class DetalleFactura {
}
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Number)
], DetalleFactura.prototype, "posicion", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], DetalleFactura.prototype, "concepto", void 0);
__decorate([
    mongoose_1.Prop({ default: '' }),
    __metadata("design:type", String)
], DetalleFactura.prototype, "descripcion", void 0);
__decorate([
    mongoose_1.Prop({ default: null }),
    __metadata("design:type", String)
], DetalleFactura.prototype, "mesServicio", void 0);
__decorate([
    mongoose_1.Prop({ default: null }),
    __metadata("design:type", String)
], DetalleFactura.prototype, "sapCentroCostoId", void 0);
__decorate([
    mongoose_1.Prop({ default: null }),
    __metadata("design:type", String)
], DetalleFactura.prototype, "sapCentroCostoDesc", void 0);
__decorate([
    mongoose_1.Prop({ default: null }),
    __metadata("design:type", String)
], DetalleFactura.prototype, "sapCtaCtbleId", void 0);
__decorate([
    mongoose_1.Prop({ default: null }),
    __metadata("design:type", String)
], DetalleFactura.prototype, "sapCtaCtbleDesc", void 0);
__decorate([
    mongoose_1.Prop({ default: null }),
    __metadata("design:type", String)
], DetalleFactura.prototype, "sapOrden", void 0);
__decorate([
    mongoose_1.Prop({ default: 0.00 }),
    __metadata("design:type", Number)
], DetalleFactura.prototype, "itemNeto", void 0);
__decorate([
    mongoose_1.Prop({ default: null }),
    __metadata("design:type", String)
], DetalleFactura.prototype, "sapTaxId", void 0);
__decorate([
    mongoose_1.Prop({ default: null }),
    __metadata("design:type", String)
], DetalleFactura.prototype, "sapTaxDesc", void 0);
__decorate([
    mongoose_1.Prop({ default: 0.00 }),
    __metadata("design:type", Number)
], DetalleFactura.prototype, "itemIva", void 0);
exports.DetalleFactura = DetalleFactura;
class ImpuestoFactura {
}
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Number)
], ImpuestoFactura.prototype, "posicion", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], ImpuestoFactura.prototype, "sapTaxId", void 0);
__decorate([
    mongoose_1.Prop({ default: null }),
    __metadata("design:type", String)
], ImpuestoFactura.prototype, "sapTaxDesc", void 0);
__decorate([
    mongoose_1.Prop({ default: 0.00 }),
    __metadata("design:type", Number)
], ImpuestoFactura.prototype, "totalImpuesto", void 0);
__decorate([
    mongoose_1.Prop({ default: true }),
    __metadata("design:type", Boolean)
], ImpuestoFactura.prototype, "debeCalcularse", void 0);
exports.ImpuestoFactura = ImpuestoFactura;
class LogFactura {
}
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Date)
], LogFactura.prototype, "fechaLog", void 0);
__decorate([
    mongoose_1.Prop({ enum: constantes_model_1.DocStatus, default: 'CREADA' }),
    __metadata("design:type", String)
], LogFactura.prototype, "statusLog", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], LogFactura.prototype, "userLog", void 0);
exports.LogFactura = LogFactura;
let FacturaProveedor = class FacturaProveedor {
};
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], FacturaProveedor.prototype, "migration_id", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedor.prototype, "empresaId", void 0);
__decorate([
    mongoose_1.Prop({ default: null }),
    __metadata("design:type", String)
], FacturaProveedor.prototype, "empresaDesc", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedor.prototype, "proveedorId", void 0);
__decorate([
    mongoose_1.Prop({ default: null }),
    __metadata("design:type", String)
], FacturaProveedor.prototype, "proveedorDesc", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Date)
], FacturaProveedor.prototype, "fechaDoc", void 0);
__decorate([
    mongoose_1.Prop({ default: null }),
    __metadata("design:type", Date)
], FacturaProveedor.prototype, "fechaCtble", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedor.prototype, "sapCbteId", void 0);
__decorate([
    mongoose_1.Prop({ default: null }),
    __metadata("design:type", String)
], FacturaProveedor.prototype, "sapCbteDesc", void 0);
__decorate([
    mongoose_1.Prop({ default: null }),
    __metadata("design:type", String)
], FacturaProveedor.prototype, "numeroFactura", void 0);
__decorate([
    mongoose_1.Prop({ uppercase: true, match: /[A-Z]{3}/, default: 'ARS' }),
    __metadata("design:type", String)
], FacturaProveedor.prototype, "monedaDoc", void 0);
__decorate([
    mongoose_1.Prop({ default: 0.00 }),
    __metadata("design:type", Number)
], FacturaProveedor.prototype, "monedaCotiz", void 0);
__decorate([
    mongoose_1.Prop({ default: 0.00 }),
    __metadata("design:type", Number)
], FacturaProveedor.prototype, "totalNeto", void 0);
__decorate([
    mongoose_1.Prop({ default: null }),
    __metadata("design:type", String)
], FacturaProveedor.prototype, "sapDocId", void 0);
__decorate([
    mongoose_1.Prop({ default: null }),
    class_transformer_1.Type(() => Date),
    __metadata("design:type", Date)
], FacturaProveedor.prototype, "sapDocFecha", void 0);
__decorate([
    mongoose_1.Prop({ uppercase: true }),
    __metadata("design:type", String)
], FacturaProveedor.prototype, "areaAprobadoraId", void 0);
__decorate([
    mongoose_1.Prop({ default: null }),
    __metadata("design:type", String)
], FacturaProveedor.prototype, "areaAprobadoraDesc", void 0);
__decorate([
    mongoose_1.Prop({ enum: constantes_model_1.DocStatus, default: 'EN_CARGA' }),
    __metadata("design:type", String)
], FacturaProveedor.prototype, "docStatus", void 0);
__decorate([
    mongoose_1.Prop({ default: null }),
    __metadata("design:type", String)
], FacturaProveedor.prototype, "pdfFile", void 0);
__decorate([
    mongoose_1.Prop({ type: DetalleFactura, _id: false }),
    __metadata("design:type", Array)
], FacturaProveedor.prototype, "detalle", void 0);
__decorate([
    mongoose_1.Prop({ type: ImpuestoFactura, _id: false }),
    __metadata("design:type", Array)
], FacturaProveedor.prototype, "impuestos", void 0);
__decorate([
    mongoose_1.Prop({ type: LogFactura, _id: false }),
    __metadata("design:type", Array)
], FacturaProveedor.prototype, "log", void 0);
FacturaProveedor = __decorate([
    mongoose_1.Schema({
        collection: 'factura_proveedores'
    })
], FacturaProveedor);
exports.FacturaProveedor = FacturaProveedor;
exports.FacturaProveedorSchema = mongoose_1.SchemaFactory.createForClass(FacturaProveedor);
//# sourceMappingURL=factura-proveedor.schema.js.map