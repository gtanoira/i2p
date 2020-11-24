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
    return this.facturaProveedorModel.find();
  }
  
  // Traer un registro 
  async findOne(id: string): Promise<FacturaProveedor> {
    return await this.facturaProveedorModel.findById(id).exec();
  }
  
  // Grabar un nuevo doc
  async addFacturaProveedor(factura: FacturaProveedor) {
    return this.facturaProveedorModel.create(factura);
  }

  // Actualizar una factura
  async patchFacturaProveedor(id: string, datosActualizar: {[key:string]: any}) {
    return await this.facturaProveedorModel.findOneAndUpdate(
      {_id: id},
      { $set: datosActualizar}
    ).exec();
  }
}
