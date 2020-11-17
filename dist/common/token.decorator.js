"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const common_1 = require("@nestjs/common");
const user_auth_model_1 = require("../models/user-auth.model");
const authorizations_service_1 = require("../shared/authorizations.service");
const http = new common_1.HttpService();
const authorizationsService = new authorizations_service_1.AuthorizationsService(http);
exports.Token = common_1.createParamDecorator((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers.authorization;
    console.log();
    console.log('*** Decorator Token:', token);
    authorizationsService.validateToken(token).subscribe(infoUser => {
        console.log('*** Decorator Info user:', infoUser);
        return infoUser;
    }, error => {
        console.log('*** Decorator authService ERROR:', error);
        return error;
    });
});
//# sourceMappingURL=token.decorator.js.map