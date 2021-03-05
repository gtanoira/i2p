import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Schemas
import { EsquemaAprobacion, EsquemaAprobacionDocument } from './esquema-aprobacion.schema';

@Injectable()
export class EsquemaAprobacionService {
  constructor(
    @InjectModel(EsquemaAprobacion.name) private esquemaAprobacionModel: Model<EsquemaAprobacionDocument>
  ) {}

  // Grabar un nuevo doc
  async addRecord(esquema: EsquemaAprobacion) {
    return this.esquemaAprobacionModel.create(esquema);
  }

  // Encontrar un esquema de aprobación que se ajuste a las especificaciones
  async findAprobacion(areaId: string, monedaId: string, importe: number): Promise<EsquemaAprobacion> {
    return this.esquemaAprobacionModel.findOne(
      {
          $and: [
              {areaAprobadoraId: {$eq: areaId}},
              {monedaId: {$eq: monedaId}},
              {importeMax: {$gte: importe}}
          ]
      
      }
    );
  }

  // Traer todos los registros
  async getAllRecords(): Promise<EsquemaAprobacion[]> {
    return this.esquemaAprobacionModel.find().exec();
  }
}
