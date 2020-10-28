import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist';

// Schemas
import { AreaAprobadora, AreaAprobadoraSchema } from './area-aprobadora.schema';
import { AreaAprobadoraOld, AreaAprobadoraOldSchema } from './old/area-aprobadora.schema';

// Controllers
import { AreaAprobadoraController } from './area-aprobadora.controller';
import { AreaAprobadoraOldController } from './old/area-aprobadora.controller';

// Services
import { AreaAprobadoraService } from './area-aprobadora.service';
import { AreaAprobadoraOldService } from './old/area-aprobadora.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AreaAprobadora.name, schema: AreaAprobadoraSchema }
    ], 'i2p_dbase'),
    MongooseModule.forFeature([
      { name: AreaAprobadoraOld.name, schema: AreaAprobadoraOldSchema }
    ], 'i2p_old'),
  ],
  controllers: [ AreaAprobadoraController, AreaAprobadoraOldController ],
  providers: [  AreaAprobadoraService, AreaAprobadoraOldService ]
})
export class AreaAprobadoraModule {}
