/* eslint-disable @typescript-eslint/no-unused-vars */
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces/nest-express-application.interface';
import { AppModule } from './app.module';

// Environment
import { SERVER_PORT } from './environment/environment.settings';

/*
  CORS Setup
*/  
// CORS origins habilitados a acceder a la app
const whiteList = [
  "http://portaladmin2.claxson.com",
  "http://portaladmin2dev.claxson.com",
  /http:\/\/10.4.[0-9]{1,3}.[0-9]{1,3}/,
  "http://localhost:4200",
];

function corsOptionsDelegate (req: Request): boolean {  //, callback: CallableFunction
  console.log(req.headers);
 
  const origen = req.headers.get('Origin') ? req.headers.get('Origin') : 'xxx';
  if (whiteList.indexOf(origen) !== -1) {
    return true;  // aprobado por CORS
  } else {
    return false; // rechazado por CORS
  }
};

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Enable CORS
  app.enableCors(
    {
      "origin": whiteList,
      "methods": "GET,PUT,PATCH,POST,DELETE",
      "allowedHeaders": "Access-Control-Allow-Origin, Access-Control-Allow-Headers, Authorization, Content-Type",
      "exposedHeaders": "",
      "preflightContinue": false,
      "optionsSuccessStatus": 200
    }
  );
  
  await app.listen(SERVER_PORT);
  console.log(`Server listening on port ${SERVER_PORT}`)
}
bootstrap();
