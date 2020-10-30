import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Schemas
import { FacturaProveedorOld, FacturaProveedorOldDocument } from './factura-proveedor-old.schema';

@Injectable()
export class FacturaProveedorOldService {

  constructor(
    @InjectModel(FacturaProveedorOld.name) private facturaProveedorOldModel: Model<FacturaProveedorOldDocument>
  ) {}

  // Traer todos los registros
  async findAll(): Promise<FacturaProveedorOld[]> {
    return this.facturaProveedorOldModel.find().exec();
  }
}
