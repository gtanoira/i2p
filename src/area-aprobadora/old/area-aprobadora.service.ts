import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Schemas
import { AreaAprobadoraOld, AreaAprobadoraOldDocument } from './area-aprobadora.schema';

@Injectable()
export class AreaAprobadoraOldService {

  constructor(
    @InjectModel(AreaAprobadoraOld.name) private areaAprobadoraOldModel: Model<AreaAprobadoraOldDocument>
  ) {}

  // Traer todos los registros
  async findAll(): Promise<AreaAprobadoraOld[]> {
    return this.areaAprobadoraOldModel.find().exec();
  }
}
