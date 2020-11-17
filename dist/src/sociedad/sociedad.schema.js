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
exports.SociedadSchema = exports.Sociedad = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
const centro_costo_model_1 = require("src/models/centro-costo.model");
const orden_model_1 = require("src/models/orden.model");
let Sociedad = class Sociedad {
};
__decorate([
    mongoose_1.Prop({ unique: true }),
    class_validator_1.IsEmpty({ message: 'El id SAP de la sociedad no puede estar vacío.' }),
    __metadata("design:type", String)
], Sociedad.prototype, "sapId", void 0);
__decorate([
    mongoose_1.Prop(),
    class_validator_1.IsEmpty({ message: 'El nombre de la sociendad no puede estar vacío' }),
    __metadata("design:type", String)
], Sociedad.prototype, "name", void 0);
__decorate([
    mongoose_1.Prop({ type: centro_costo_model_1.CentroCosto, _id: false }),
    __metadata("design:type", Array)
], Sociedad.prototype, "centroCostos", void 0);
__decorate([
    mongoose_1.Prop({ type: orden_model_1.Orden, _id: false }),
    __metadata("design:type", Array)
], Sociedad.prototype, "ordenes", void 0);
Sociedad = __decorate([
    mongoose_1.Schema({
        collection: 'sociedades'
    })
], Sociedad);
exports.Sociedad = Sociedad;
exports.SociedadSchema = mongoose_1.SchemaFactory.createForClass(Sociedad);
//# sourceMappingURL=sociedad.schema.js.map