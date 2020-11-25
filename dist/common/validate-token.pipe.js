"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateTokenPipe = void 0;
const common_1 = require("@nestjs/common");
const user_auth_model_1 = require("../models/user-auth.model");
const authorizations_service_1 = require("../shared/authorizations.service");
let ValidateTokenPipe = class ValidateTokenPipe {
    constructor() {
        this.http = new common_1.HttpService();
        this.authorizationsService = new authorizations_service_1.AuthorizationsService(this.http);
    }
    async transform(data, metadata) {
        const token = data;
        return await this.authorizationsService.validateToken(token).toPromise()
            .then(infoUser => {
            return infoUser;
        })
            .catch(error => {
            throw new common_1.UnauthorizedException(error);
        });
    }
};
ValidateTokenPipe = __decorate([
    common_1.Injectable()
], ValidateTokenPipe);
exports.ValidateTokenPipe = ValidateTokenPipe;
//# sourceMappingURL=validate-token.pipe.js.map