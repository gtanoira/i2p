import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Models & Schemas
import { Sociedad, SociedadDocument } from './sociedad.schema';
import { Orden } from 'src/models/orden.model';

@Injectable()
export class SociedadService {

  constructor(
    @InjectModel(Sociedad.name) private sociedadModel: Model<SociedadDocument>
  ) {}

  // Traer todos los registros
  public findAll(): Promise<Sociedad[]> {
    return this.sociedadModel.find().exec();
  }

  // Grabar un nuevo doc
  public addSociedad(sociedad: Sociedad): Promise<SociedadDocument> {
    return this.sociedadModel.create(sociedad);
  }

  // Agrgar una nueva orden a una sociedad
  public addOrden(sociedad: string, orden: Orden): Promise<SociedadDocument> {
    //return this.sociedadModel.update()
    return null;
  }
}
