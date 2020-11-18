import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Binary } from 'bson';

// Schemas
import { FacturaProveedorOld, FacturaProveedorOldDocument } from './factura-proveedor-old.schema';
import { FacturaImagenOld, FacturaImagenOldDocument } from './factura-imagen-old.schema';

@Injectable()
export class FacturaProveedorOldService {

  constructor(
    @InjectModel(FacturaProveedorOld.name) private facturaProveedorOldModel: Model<FacturaProveedorOldDocument>,
    @InjectModel(FacturaImagenOld.name) private facturaImagenOldModel: Model<FacturaImagenOldDocument>
  ) {}

  // Traer todos los registros
  async findAll(): Promise<FacturaProveedorOld[]> {
    return this.facturaProveedorOldModel.find().exec();  //.limit(5);  //
  }

  // Obtener una imagen (registro PDF) de un documento
  async getPdfFile(id: Types.ObjectId): Promise<Binary | null> {
    return this.facturaImagenOldModel.findById(id)
      .then(data => {
        if (data.pdf_file && data.pdf_file.length() > 0) {
          return data.pdf_file;
        } else {
          return null;
        }
      });
  }
}
