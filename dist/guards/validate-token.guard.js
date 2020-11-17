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
exports.ValidateTokenGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const user_auth_model_1 = require("../models/user-auth.model");
const authorizations_service_1 = require("../shared/authorizations.service");
let ValidateTokenGuard = class ValidateTokenGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        let rtnInfo = {
            user: null,
            fullName: null
        };
        const req = context.switchToHttp().getRequest();
        const token = req.headers.authorization;
        console.log();
        console.log('*** Guard Token:', token);
        this.authorizationsService.validateToken(token).subscribe(infoUser => {
            console.log('*** Decorator Info user:', infoUser);
            return infoUser;
        }, error => {
            console.log('*** ERROR:', error);
            throw new common_1.UnauthorizedException(error);
        });
        return true;
    }
};
ValidateTokenGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [core_1.Reflector])
], ValidateTokenGuard);
exports.ValidateTokenGuard = ValidateTokenGuard;
//# sourceMappingURL=validate-token.guard.js.map