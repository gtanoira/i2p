import { BadRequestException, HttpException, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

// Environment
import { PUBLIC_PATH } from '../environment/environment.settings';
// Schemas
import { FacturaProveedor, FacturaProveedorSchema } from './factura-proveedor.schema';
import { FacturaImagenOld, FacturaImagenOldSchema } from './old/factura-imagen-old.schema';
import { FacturaProveedorOld, FacturaProveedorOldSchema } from './old/factura-proveedor-old.schema';

// Controllers
import { FacturaProveedorController } from './factura-proveedor.controller';
import { FacturaProveedorOldController } from './old/factura-proveedor.controller';

// Services
import { FacturaProveedorService } from './factura-proveedor.service';
import { FacturaProveedorOldService } from './old/factura-proveedor.service';

// Multer upload options
const multerOptions = {
  // Enable file size limits
  /* limits: {
      fileSize: +process.env.MAX_FILE_SIZE,
  }, */
  // Chequear los mimetype permitidos de los archivos para upload
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/pdf$/)) {
      // Grabar el archivo
      cb(null, true);
    } else {
      // Rechazar archivo
      cb(new BadRequestException(`Unsupported file type ${extname(file.originalname)}`));
    }
  },
  // Storage properties
  storage: diskStorage({
    // Destination storage path details
    destination: (req: any, file: any, cb: any) => {
      const uploadPath = `${PUBLIC_PATH}/pdf`;
      cb(null, uploadPath);
    },
    // Nombre del archivo
    filename: (req: any, file: any, cb: any) => {
      const fileName = `${req.body.proveedorId}_${req.body.fechaCtble}_${req.body.numeroFactura.trim()}.pdf`
      cb(null, fileName);
    },
}),
};

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FacturaProveedor.name, schema: FacturaProveedorSchema }
    ], 'i2p_dbase'),
    MongooseModule.forFeature([
      { name: FacturaProveedorOld.name, schema: FacturaProveedorOldSchema },
      { name: FacturaImagenOld.name, schema: FacturaImagenOldSchema }
    ], 'i2p_old'),
    MulterModule.register(multerOptions)
  ],
  controllers: [
    FacturaProveedorController,
    FacturaProveedorOldController
  ],
  providers: [
    FacturaProveedorService, 
    FacturaProveedorOldService
  ]
})
export class FacturaProveedorModule {}
