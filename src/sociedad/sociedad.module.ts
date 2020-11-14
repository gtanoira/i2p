import { Module } from '@nestjs/common';

// Controllers
import { SociedadController } from './sociedad.controller';

// Services
import { SociedadService } from './sociedad.service';

// Schemas
import { Sociedad, SociedadSchema } from './sociedad.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Sociedad.name, schema: SociedadSchema }
    ], 'i2p_dbase'),
  ],
  controllers: [
    SociedadController
  ],
  providers: [
    SociedadService
  ]
})
export class SociedadModule {}
