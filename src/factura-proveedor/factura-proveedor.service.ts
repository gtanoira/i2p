import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { query } from 'express';
import { Model } from 'mongoose';

// Models
import { UserAuth } from 'src/models/user-auth.model';
// Roles
import { UserRoles } from 'src/models/user.roles';


// Schemas
import { FacturaProveedor, FacturaProveedorDocument } from './factura-proveedor.schema';
// Models & Interfaces
interface getAllParams {
  infoUser: UserAuth,
  pageNo?: number,
  recsPage?: number,
  sortField?: string,
  sortDirection?: string,
  proveedorId: string,
  search: string
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
    return this.facturaProveedorModel.countDocuments(this.createQuery(infoUser));
  }

  // Crear el query para el filtrado de las facturas
  private createQuery(infoUser: UserAuth): {[key: string]: any} {
    // Validar si es SUPERUSER
    if(infoUser.authorizations.role && infoUser.authorizations.role === UserRoles.SUPERUSER) return {};
    // Validar que existan los datos necesarios
    if (infoUser.user === 'NoUser' ||
        !infoUser.authorizations.role ||
        !infoUser.authorizations.areasAprobadoras
       ) return {'_id': 'XXXXXXXXXXXX'};
    return {
      'areaAprobadoraId': {
        '$in': infoUser.authorizations.areasAprobadoras
      }
    };
  }
  
  // Traer todos los registros
  async getRecords({
    infoUser = new UserAuth('NoUser', null, {}),
    pageNo = 1,
    recsPage = 10000,
    sortField = '',
    sortDirection = 'ASC',
    proveedorId = '',
    search = ''
  }: getAllParams):Promise<FacturaProveedor[]> {
    if (pageNo <= 0 || recsPage <= 0) {
      return [];
    } else {
      const pagina = (pageNo - 1) * recsPage;
      const orderBy = sortDirection && 'ASC,DESC'.indexOf(sortDirection.toUpperCase()) > 0 ? sortDirection.toUpperCase() : `ASC`;
      // Sorting
      const sorting = {};
      if (sortField !== '' && sortField !== null) {
        sorting[sortField] = orderBy;
      }
      // Query by Proveedor
      const proveedor = {};
      if (proveedorId !== '' && proveedorId !== null) {
        proveedor['proveedorId'] = proveedorId;
      }
      // Query by search
      const s = new RegExp(search, 'i');
      const searchQuery = {};
      if (search != null && search !== '') {
        searchQuery['$or'] = [
          {proveedorDesc: {$regex: s}},
          {numeroFactura: {$regex: s}},
          {empresaDesc: {$regex: s}},
          {docStatus: {$regex: s}},
          {sapCbteId: {$regex: s}}
          /* {fechaDoc: {$regex: search}} ,*/
          /* {totalNeto: {$regex: search}} */
        ];
      }
      
      // Get the records
      return this.facturaProveedorModel.find(this.createQuery(infoUser))
      .where(proveedor)
      .where(searchQuery)
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
