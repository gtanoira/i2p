"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.I2P_OLD = exports.I2P_DBASE = exports.SERVER_PORT = exports.LOGIN_CENTRAL_SERVER = exports.SAPGW_SERVER = exports.EMAIL_SERVER_SETTINGS = void 0;
exports.EMAIL_SERVER_SETTINGS = {
    host: 'clxmail01.claxson.com',
    port: 25,
    auth: {
        user: 'uu',
        pass: 'iuu'
    },
    fromAddress: 'itcorp@claxson.com',
    SmtpServerConnectionString: `smtp://hotgo@claxson.com:hotgo_**34@clxmail01.claxson.com`,
    GmailSmtpServer: 'smtps://gonzalo.mtanoira@gmail.com:WalkingTheNow@smtp.gmail.com'
};
exports.SAPGW_SERVER = 'http://clxsapjgw02:8080/ClxWebService';
exports.LOGIN_CENTRAL_SERVER = 'http://localhost:8000';
exports.SERVER_PORT = 4700;
exports.I2P_DBASE = 'mongodb://i2p_admin:Portal.2020@admapps02:27017/i2p_dbase';
exports.I2P_OLD = 'mongodb://invoice:Inv.1984@admapps02:27017/invoice2pay';
//# sourceMappingURL=environment.settings.js.map