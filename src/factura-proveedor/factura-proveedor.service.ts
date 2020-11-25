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
  
  // Grabar un nuevo doc
  async addFacturaProveedor(factura: FacturaProveedor): Promise<FacturaProveedorDocument> {
    return this.facturaProveedorModel.create(factura);
  }
  
  // Grabar un nuevo doc
  async countFacturas(): Promise<number> {
    return this.facturaProveedorModel.count({});
  }
  
  // Traer todos los registros
  async findAll(page: number, recsPerPage: number): Promise<FacturaProveedor[]> {
    if (page === 0 || recsPerPage === 0) {
      return this.facturaProveedorModel.find().exec();
    } else {
      const pagina = (page - 1) * recsPerPage;
      return this.facturaProveedorModel.find().skip(pagina).limit(Math.abs(recsPerPage)).exec();
    }
  }
  
  // Traer un registro 
  async findOne(id: string): Promise<FacturaProveedor> {
    return await this.facturaProveedorModel.findById(id).exec();
  }

  // Actualizar una factura
  async patchFacturaProveedor(id: string, datosActualizar: {[key:string]: any}) {
    return await this.facturaProveedorModel.findOneAndUpdate(
      {_id: id},
      { $set: datosActualizar}
    ).exec();
  }
}
