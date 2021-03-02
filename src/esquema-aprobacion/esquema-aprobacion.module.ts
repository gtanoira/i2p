import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Schemas
import { EsquemaAprobacion, EsquemaAprobacionSchema } from './esquema-aprobacion.schema';
// Controllers
import { EsquemaAprobacionController } from './esquema-aprobacion.controller';
// Services
import { EsquemaAprobacionService } from './esquema-aprobacion.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EsquemaAprobacion.name, schema: EsquemaAprobacionSchema }
    ], 'i2p_dbase')
  ],
  controllers: [
    EsquemaAprobacionController
  ],
  providers: [
    EsquemaAprobacionService
  ]
})
export class EsquemaAprobacionModule {}
