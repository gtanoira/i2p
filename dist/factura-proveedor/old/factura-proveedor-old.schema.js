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
exports.FacturaProveedorOldSchema = exports.FacturaProveedorOld = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
class DetalleFactura {
}
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], DetalleFactura.prototype, "linenumber", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], DetalleFactura.prototype, "costcenter", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], DetalleFactura.prototype, "accountcode", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], DetalleFactura.prototype, "amount_item", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], DetalleFactura.prototype, "tax_percentage", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], DetalleFactura.prototype, "tax_amount", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], DetalleFactura.prototype, "order", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], DetalleFactura.prototype, "concept", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], DetalleFactura.prototype, "servicemonth", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], DetalleFactura.prototype, "description", void 0);
class ImpuestoFactura {
}
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], ImpuestoFactura.prototype, "taxcode", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], ImpuestoFactura.prototype, "taxamount", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], ImpuestoFactura.prototype, "regulartax", void 0);
class LogFactura {
}
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], LogFactura.prototype, "update_date", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], LogFactura.prototype, "action", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], LogFactura.prototype, "description", void 0);
let FacturaProveedorOld = class FacturaProveedorOld {
};
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], FacturaProveedorOld.prototype, "_id", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Date)
], FacturaProveedorOld.prototype, "maxdatetorelease", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedorOld.prototype, "supplier", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedorOld.prototype, "approvalarea", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedorOld.prototype, "company", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedorOld.prototype, "accountingdate", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedorOld.prototype, "documentdate", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedorOld.prototype, "documenttype", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedorOld.prototype, "documentnumber", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedorOld.prototype, "currency", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedorOld.prototype, "netamountinvoice", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedorOld.prototype, "totaltax", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedorOld.prototype, "totalinvoice", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedorOld.prototype, "approver_total", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedorOld.prototype, "aplevel", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedorOld.prototype, "approver1", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedorOld.prototype, "approver1date", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedorOld.prototype, "approver1user", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedorOld.prototype, "release1", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedorOld.prototype, "approver2", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedorOld.prototype, "approver2date", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedorOld.prototype, "approver2user", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedorOld.prototype, "release2", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedorOld.prototype, "approver3", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedorOld.prototype, "approver3date", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedorOld.prototype, "approver3user", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedorOld.prototype, "release3", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedorOld.prototype, "approver4", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedorOld.prototype, "approver4date", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedorOld.prototype, "approver4user", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedorOld.prototype, "release4", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedorOld.prototype, "approver5", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedorOld.prototype, "approver5date", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedorOld.prototype, "approver5user", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedorOld.prototype, "release5", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedorOld.prototype, "createdby", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedorOld.prototype, "exchangerate", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedorOld.prototype, "sap_id", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedorOld.prototype, "sap_status", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], FacturaProveedorOld.prototype, "sap_date", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Date)
], FacturaProveedorOld.prototype, "createddate", void 0);
__decorate([
    mongoose_1.Prop({ type: LogFactura }),
    __metadata("design:type", Array)
], FacturaProveedorOld.prototype, "general_log", void 0);
__decorate([
    mongoose_1.Prop({ type: DetalleFactura }),
    __metadata("design:type", Array)
], FacturaProveedorOld.prototype, "detail", void 0);
__decorate([
    mongoose_1.Prop({ type: ImpuestoFactura }),
    __metadata("design:type", Array)
], FacturaProveedorOld.prototype, "detailtax", void 0);
FacturaProveedorOld = __decorate([
    mongoose_1.Schema({
        collection: 'supplierinvoices'
    })
], FacturaProveedorOld);
exports.FacturaProveedorOld = FacturaProveedorOld;
exports.FacturaProveedorOldSchema = mongoose_1.SchemaFactory.createForClass(FacturaProveedorOld);
//# sourceMappingURL=factura-proveedor-old.schema.js.map