import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';

// Environment
import { PUBLIC_PATH } from '../environment/environment.settings';
// Schemas
import { EsquemaAprobacion, EsquemaAprobacionSchema } from 'src/esquema-aprobacion/esquema-aprobacion.schema';
import { FacturaProveedor, FacturaProveedorSchema } from './factura-proveedor.schema';
import { FacturaImagenOld, FacturaImagenOldSchema } from './old/factura-imagen-old.schema';
import { FacturaProveedorOld, FacturaProveedorOldSchema } from './old/factura-proveedor-old.schema';
// Controllers
import { FacturaProveedorController } from './factura-proveedor.controller';
import { FacturaProveedorOldController } from './old/factura-proveedor.controller';
// Services
import { EsquemaAprobacionService } from 'src/esquema-aprobacion/esquema-aprobacion.service';
import { FacturaProveedorService } from './factura-proveedor.service';
import { FacturaProveedorOldService } from './old/factura-proveedor.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EsquemaAprobacion.name, schema: EsquemaAprobacionSchema },
      { name: FacturaProveedor.name, schema: FacturaProveedorSchema }
    ], 'i2p_dbase'),
    MongooseModule.forFeature([
      { name: FacturaProveedorOld.name, schema: FacturaProveedorOldSchema },
      { name: FacturaImagenOld.name, schema: FacturaImagenOldSchema }
    ], 'i2p_old'),
    MulterModule.register({
      dest: `${PUBLIC_PATH}/pdf`
    })
  ],
  controllers: [
    FacturaProveedorController,
    FacturaProveedorOldController
  ],
  providers: [
    EsquemaAprobacionService,
    FacturaProveedorService, 
    FacturaProveedorOldService
  ]
})
export class FacturaProveedorModule {}
