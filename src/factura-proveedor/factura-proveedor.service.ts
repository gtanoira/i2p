import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Schemas
import { FacturaProveedor, FacturaProveedorDocument } from './factura-proveedor.schema';
// Models & Interfaces
interface getAllParams {
  pageNo?: number,
  recsPage?: number,
  sortField?: string,
  sortDirection?: string
};

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
  async getRecords({
    pageNo = 1,
    recsPage = 10000,
    sortField = '',
    sortDirection = 'ASC'
  }: getAllParams):Promise<FacturaProveedor[]> {
    if (pageNo <= 0 || recsPage <= 0) {
      return [];
    } else {
      const pagina = (pageNo - 1) * recsPage;
      const orderBy = sortDirection && 'ASC,DESC'.indexOf(sortDirection.toUpperCase()) > 0 ? sortDirection.toUpperCase() : `ASC`;
      const sorting = {};
      sorting[sortField] = orderBy;
      console.log(pageNo, recsPage, pagina, orderBy, sorting)
      return this.facturaProveedorModel.find()
      .sort(sorting)
      .skip(pagina)
      .limit(Math.abs(recsPage))
      .exec();
    }
  }
  
  // Traer un registro 
  async findOne(id: string): Promise<FacturaProveedorDocument> {
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
