"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const environment_settings_1 = require("./environment/environment.settings");
const whiteList = [
    "http://portaladmin2.claxson.com",
    "http://portaladmin2dev.claxson.com",
    /http:\/\/10.4.[0-9]{1,3}.[0-9]{1,3}/,
    "http://localhost:4200",
];
function corsOptionsDelegate(req) {
    console.log(req.headers);
    const origen = req.headers.get('Origin') ? req.headers.get('Origin') : 'xxx';
    if (whiteList.indexOf(origen) !== -1) {
        return true;
    }
    else {
        return false;
    }
}
;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        "origin": whiteList,
        "methods": "GET,PUT,PATCH,POST,DELETE",
        "allowedHeaders": "Access-Control-Allow-Origin, Access-Control-Allow-Headers, Authorization, Content-Type",
        "exposedHeaders": "",
        "preflightContinue": false,
        "optionsSuccessStatus": 200
    });
    await app.listen(environment_settings_1.SERVER_PORT);
    console.log(`Server listening on port ${environment_settings_1.SERVER_PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map