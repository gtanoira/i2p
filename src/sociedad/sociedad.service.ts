import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';

// Models & Schemas
import { Sociedad, SociedadDocument } from './sociedad.schema';

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
  public addSociedad(sociedad: Sociedad): Observable<SociedadDocument> {
    return from(this.sociedadModel.create(sociedad));
  }

}
