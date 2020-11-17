"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsTokenValid = void 0;
const common_1 = require("@nestjs/common");
exports.IsTokenValid = common_1.createParamDecorator((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    console.log('*** REQUEST:');
    console.log(request.headers);
    const token = request.headers.authorization;
    console.log('*** TOKEN:');
    console.log(token);
    return token ? token : null;
});
//# sourceMappingURL=is-token-valid.decorator.js.map