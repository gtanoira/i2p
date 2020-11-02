import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Schemas
import { FacturaProveedor, FacturaProveedorDocument } from './factura-proveedor.schema';

@Injectable()
export class FacturaProveedorService {
  
  constructor(
    @InjectModel(FacturaProveedor.name) private facturaProveedorModel: Model<FacturaProveedorDocument>
  ) {}
  
  // Traer todos los registros
  async findAll(): Promise<FacturaProveedor[]> {
    console.log('*** PASO 1');
    return this.facturaProveedorModel.find({$limit : 2});
  }

  // Grabar un nuevo doc
  async addFacturaProveedor(factura: FacturaProveedor) {
    return this.facturaProveedorModel.create(factura);
  }
}