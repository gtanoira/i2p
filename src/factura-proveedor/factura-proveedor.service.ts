import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Models
import { UserAuth } from 'src/models/user-auth.model';

// Schemas
import { FacturaProveedor, FacturaProveedorDocument } from './factura-proveedor.schema';
// Models & Interfaces
interface getAllParams {
  infoUser: UserAuth,
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
  async countFacturas(infoUser = new UserAuth('NoUser', null, {})): Promise<number> {
    // Armar el query para traer las facturas dependiendo del usuario
    if (infoUser.user === 'NoUser' || !infoUser.authorizations.areasAprobadoras) return 0;
    const findQuery = {
      'areaAprobadoraId': {
        '$in': infoUser.authorizations.areasAprobadoras
      }
    };
    return this.facturaProveedorModel.count(findQuery);
  }
  
  // Traer todos los registros
  async getRecords({
    infoUser = new UserAuth('NoUser', null, {}),
    pageNo = 1,
    recsPage = 10000,
    sortField = '',
    sortDirection = 'ASC'
  }: getAllParams):Promise<FacturaProveedor[]> {
    if (pageNo <= 0 || recsPage <= 0) {
      return [];
    } else {
      // Armar el query para traer las facturas dependiendo del usuario
      if (infoUser.user === 'NoUser' || !infoUser.authorizations.areasAprobadoras) return [];
      const findQuery = {
        'areaAprobadoraId': {
          '$in': infoUser.authorizations.areasAprobadoras
        }
      };
      const pagina = (pageNo - 1) * recsPage;
      const orderBy = sortDirection && 'ASC,DESC'.indexOf(sortDirection.toUpperCase()) > 0 ? sortDirection.toUpperCase() : `ASC`;
      const sorting = {};
      if (sortField !== '' && sortField !== null) {
        sorting[sortField] = orderBy;
      }
      console.log(infoUser);
      console.log(pageNo, recsPage, pagina, orderBy, sorting, findQuery)
      return this.facturaProveedorModel.find(findQuery)
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
