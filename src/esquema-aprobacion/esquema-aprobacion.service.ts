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

  // Traer todos los registros
  async getAllRecords(): Promise<EsquemaAprobacion[]> {
    return this.esquemaAprobacionModel.find().exec();
  }

  // Grabar un nuevo doc
  async addRecord(esquema: EsquemaAprobacion) {
    return this.esquemaAprobacionModel.create(esquema);
  }
}
