// Credenciales para acceder al mail server de Claxson
export const EMAIL_SERVER_SETTINGS = { 
  host: 'clxmail01.claxson.com',
  port: 25,
  auth: {
    user: 'uu',
    pass: 'iuu'
  },  
  fromAddress: 'itcorp@claxson.com',
  SmtpServerConnectionString: `smtp://hotgo@claxson.com:hotgo_**34@clxmail01.claxson.com`,
  GmailSmtpServer: 'smtps://gonzalo.mtanoira@gmail.com:WalkingTheNow@smtp.gmail.com'
}

// Sap-Gw
export const SAPGW_SERVER = 'http://clxsapjgw02:8080/ClxWebService';

// Login Central Server
export const LOGIN_CENTRAL_SERVER = 'http://localhost:8000';  // 'http://logincentraldev.claxson.com';

// Default PORT
export const SERVER_PORT = 4700;

// MongoDB
export const I2P_DBASE = 'mongodb://i2p_admin:Portal.2020@admapps02:27017/i2p_dbase';

// OLD MongoDB (Juan Carta)
export const I2P_OLD = 'mongodb://invoice:Inv.1984@admapps02:27017/invoice2pay';

// Public folder
export const PUBLIC_URL = `http://localhost:${SERVER_PORT}/public`;
export const PUBLIC_PATH = './public';
