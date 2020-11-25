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
exports.AuthorizationsService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const environment_settings_1 = require("src/environment/environment.settings");
const user_auth_model_1 = require("src/models/user-auth.model");
let AuthorizationsService = class AuthorizationsService {
    constructor(http) {
        this.http = http;
    }
    validateToken(token) {
        const headers = {
            authorization: token
        };
        return this.http.get(`${environment_settings_1.LOGIN_CENTRAL_SERVER}/api2/validatesession/invoice2pay`, { headers }).pipe(operators_1.map(infoUser => {
            return new user_auth_model_1.UserAuth(infoUser.data.user, infoUser.data.fullName, infoUser.data.authorizations ? infoUser.data.authorizations : {});
        }), operators_1.catchError(error => {
            return rxjs_1.throwError(error.response.data.message.toString());
        }));
    }
};
AuthorizationsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService])
], AuthorizationsService);
exports.AuthorizationsService = AuthorizationsService;
//# sourceMappingURL=authorizations.service.js.map