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
exports.SociedadController = void 0;
const common_1 = require("@nestjs/common");
const sociedad_service_1 = require("./sociedad.service");
const user_auth_model_1 = require("../models/user-auth.model");
const orden_dto_1 = require("../dto/orden.dto");
const sociedad_dto_1 = require("../dto/sociedad.dto");
const get_token_decorator_1 = require("../common/get-token.decorator");
const validate_token_pipe_1 = require("../common/validate-token.pipe");
let SociedadController = class SociedadController {
    constructor(sociedadService) {
        this.sociedadService = sociedadService;
    }
    async findAll(infoUser) {
        return await this.sociedadService.findAll();
    }
    async addFactura(infoUser, sociedadDto) {
        return await this.sociedadService.addSociedad(sociedadDto)
            .catch(error => {
            throw new common_1.BadRequestException(error.message);
        });
    }
    async addOrden(infoUser, sociedadId, ordenDto) {
        return await this.sociedadService.addOrden(sociedadId, ordenDto)
            .catch(error => {
            throw new common_1.BadRequestException(error.message);
        });
    }
};
__decorate([
    common_1.Get(),
    __param(0, get_token_decorator_1.GetToken(new validate_token_pipe_1.ValidateTokenPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SociedadController.prototype, "findAll", null);
__decorate([
    common_1.Post(),
    common_1.HttpCode(200),
    __param(0, get_token_decorator_1.GetToken(new validate_token_pipe_1.ValidateTokenPipe)),
    __param(1, common_1.Body(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, sociedad_dto_1.CreateSociedadDto]),
    __metadata("design:returntype", Promise)
], SociedadController.prototype, "addFactura", null);
__decorate([
    common_1.Post('/:sociedadId/ordenes'),
    common_1.HttpCode(200),
    __param(0, get_token_decorator_1.GetToken(new validate_token_pipe_1.ValidateTokenPipe)),
    __param(1, common_1.Param('sociedadId')),
    __param(2, common_1.Body(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, orden_dto_1.CreateOrdenDto]),
    __metadata("design:returntype", Promise)
], SociedadController.prototype, "addOrden", null);
SociedadController = __decorate([
    common_1.Controller('sociedades'),
    __metadata("design:paramtypes", [sociedad_service_1.SociedadService])
], SociedadController);
exports.SociedadController = SociedadController;
//# sourceMappingURL=sociedad.controller.js.map