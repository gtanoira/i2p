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
exports.CreateFacturaProveedorDto = exports.LogFactura = exports.ImpuestoFactura = exports.DetalleFactura = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const constantes_model_1 = require("../models/constantes.model");
class DetalleFactura {
}
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], DetalleFactura.prototype, "posicion", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], DetalleFactura.prototype, "concepto", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], DetalleFactura.prototype, "descripcion", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], DetalleFactura.prototype, "mesServicio", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], DetalleFactura.prototype, "sapCentroCostoId", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], DetalleFactura.prototype, "sapCentroCostoDesc", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], DetalleFactura.prototype, "sapCtaCtbleId", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], DetalleFactura.prototype, "sapCtaCtbleDesc", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], DetalleFactura.prototype, "sapOrden", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], DetalleFactura.prototype, "itemNeto", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], DetalleFactura.prototype, "sapTaxId", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], DetalleFactura.prototype, "sapTaxDesc", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], DetalleFactura.prototype, "itemIva", void 0);
exports.DetalleFactura = DetalleFactura;
class ImpuestoFactura {
}
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], ImpuestoFactura.prototype, "posicion", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], ImpuestoFactura.prototype, "sapTaxId", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsEmpty(),
    __metadata("design:type", String)
], ImpuestoFactura.prototype, "sapTaxDesc", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], ImpuestoFactura.prototype, "totalImpuesto", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], ImpuestoFactura.prototype, "debeCalcularse", void 0);
exports.ImpuestoFactura = ImpuestoFactura;
class LogFactura {
}
__decorate([
    swagger_1.ApiProperty(),
    class_transformer_1.Type(() => Date),
    class_validator_1.IsDate(),
    __metadata("design:type", Date)
], LogFactura.prototype, "fechaLog", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsEnum(constantes_model_1.DocStatus, { message: `El valor del statusLog es incorrecto: ${constantes_model_1.DocStatus}.` }),
    __metadata("design:type", String)
], LogFactura.prototype, "statusLog", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], LogFactura.prototype, "userLog", void 0);
exports.LogFactura = LogFactura;
class CreateFacturaProveedorDto {
    setProveedorId() {
        this.proveedorId = `0000000000${this.proveedorId}`.substr(0, 10);
    }
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateFacturaProveedorDto.prototype, "empresaId", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateFacturaProveedorDto.prototype, "empresaDesc", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNumberString({ no_symbols: true }),
    class_validator_1.Length(1, 10),
    __metadata("design:type", String)
], CreateFacturaProveedorDto.prototype, "proveedorId", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateFacturaProveedorDto.prototype, "proveedorDesc", void 0);
__decorate([
    class_transformer_1.Type(() => Date),
    class_validator_1.IsDate(),
    __metadata("design:type", Date)
], CreateFacturaProveedorDto.prototype, "fechaDoc", void 0);
__decorate([
    class_transformer_1.Type(() => Date),
    __metadata("design:type", Date)
], CreateFacturaProveedorDto.prototype, "fechaCtble", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateFacturaProveedorDto.prototype, "sapCbteId", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateFacturaProveedorDto.prototype, "sapCbteDesc", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateFacturaProveedorDto.prototype, "numeroFactura", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateFacturaProveedorDto.prototype, "monedaDoc", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], CreateFacturaProveedorDto.prototype, "monedaCotiz", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], CreateFacturaProveedorDto.prototype, "totalNeto", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsEmpty(),
    __metadata("design:type", String)
], CreateFacturaProveedorDto.prototype, "sapDocId", void 0);
__decorate([
    class_transformer_1.Type(() => Date),
    class_validator_1.IsDate(),
    __metadata("design:type", Date)
], CreateFacturaProveedorDto.prototype, "sapDocFecha", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateFacturaProveedorDto.prototype, "areaAprobadoraId", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateFacturaProveedorDto.prototype, "areaAprobadoraDesc", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsEnum(constantes_model_1.DocStatus, { message: `El valor del docStatus es incorrecto: ${constantes_model_1.DocStatus}.` }),
    __metadata("design:type", String)
], CreateFacturaProveedorDto.prototype, "docStatus", void 0);
__decorate([
    class_transformer_1.Type(() => DetalleFactura),
    class_validator_1.ValidateNested({ each: true }),
    __metadata("design:type", Array)
], CreateFacturaProveedorDto.prototype, "detalle", void 0);
__decorate([
    class_transformer_1.Type(() => ImpuestoFactura),
    class_validator_1.ValidateNested({ each: true }),
    __metadata("design:type", Array)
], CreateFacturaProveedorDto.prototype, "impuestos", void 0);
__decorate([
    class_transformer_1.Type(() => LogFactura),
    class_validator_1.ValidateNested({ each: true }),
    __metadata("design:type", Array)
], CreateFacturaProveedorDto.prototype, "log", void 0);
exports.CreateFacturaProveedorDto = CreateFacturaProveedorDto;
//# sourceMappingURL=factura-proveedor.dto.js.map