"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const environment_settings_1 = require("./environment/environment.settings");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(environment_settings_1.SERVER_PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map