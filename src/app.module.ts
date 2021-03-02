import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Environment
import { I2P_DBASE, I2P_OLD } from './environment/environment.settings';

// Controllers
import { AppController } from './app.controller';

// Services
import { AppService } from './app.service';
import { AuthorizationsService } from './shared/authorizations.service';

// Modules
import { AreaAprobadoraModule } from './area-aprobadora/area-aprobadora.module';
import { FacturaProveedorModule } from './factura-proveedor/factura-proveedor.module';
import { SociedadModule } from './sociedad/sociedad.module';
import { EsquemaAprobacionModule } from './esquema-aprobacion/esquema-aprobacion.module';

// MongoDB Connection Options (database)
const connOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  bufferCommands: true
};

@Module({
  imports: [
    // Base de datos I2p
    MongooseModule.forRoot(I2P_DBASE, {
      connectionName: 'i2p_dbase',
      ...connOptions
    }),
    // Base de datos I2p (Juan Carta)
    MongooseModule.forRoot(I2P_OLD, {
      connectionName: 'i2p_old',
      ...connOptions
    }),
    AreaAprobadoraModule,
    FacturaProveedorModule,
    HttpModule,
    SociedadModule,
    EsquemaAprobacionModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
    AuthorizationsService
  ],
})
export class AppModule {}
