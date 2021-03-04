import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Schemas
import { AreaAprobadora, AreaAprobadoraDocument } from './area-aprobadora.schema';

@Injectable()
export class AreaAprobadoraService {

  constructor(
    @InjectModel(AreaAprobadora.name) private areaAprobadoraModel: Model<AreaAprobadoraDocument>
  ) {}

  // Traer todos los registros
  async findAll(): Promise<AreaAprobadora[]> {
    return this.areaAprobadoraModel.find().exec();
  }

  // Grabar un nuevo doc
  async addAreaAprobadora(area: AreaAprobadora) {
    return this.areaAprobadoraModel.create(area);
  }

  // Obtener un solo registro
  async findOneRecord(area: string): Promise<AreaAprobadora> {
    return this.areaAprobadoraModel.findOne({id: area});
  }
}
