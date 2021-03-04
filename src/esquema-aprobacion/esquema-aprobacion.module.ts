import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Schemas
import { AreaAprobadora, AreaAprobadoraSchema } from 'src/area-aprobadora/area-aprobadora.schema';
import { EsquemaAprobacion, EsquemaAprobacionSchema } from './esquema-aprobacion.schema';
// Controllers
import { EsquemaAprobacionController } from './esquema-aprobacion.controller';
// Services
import { AreaAprobadoraService } from 'src/area-aprobadora/area-aprobadora.service';
import { EsquemaAprobacionService } from './esquema-aprobacion.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AreaAprobadora.name, schema: AreaAprobadoraSchema },
      { name: EsquemaAprobacion.name, schema: EsquemaAprobacionSchema }
    ], 'i2p_dbase')
  ],
  controllers: [
    EsquemaAprobacionController
  ],
  providers: [
    AreaAprobadoraService,
    EsquemaAprobacionService
  ]
})
export class EsquemaAprobacionModule {}
