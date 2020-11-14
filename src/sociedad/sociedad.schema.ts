import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmpty, validate } from 'class-validator';
import { Document } from 'mongoose';

// Models
import { CentroCosto } from 'src/models/centro-costo.model';
import { Orden } from 'src/models/orden.model';

export type SociedadDocument = Sociedad & Document;

@Schema({
  collection: 'sociedades'
})
export class Sociedad {

  @Prop({unique: true})
  @IsEmpty({message: 'El id SAP de la sociedad no puede estar vacío.'})
  public sapId!: string;

  @Prop()
  @IsEmpty({message: 'El nombre de la sociendad no puede estar vacío'})
  public name!: string;

  // Centro de Costos
  @Prop({ type: CentroCosto, _id: false })
  public centroCostos?: CentroCosto[]

  // Ordenes
  @Prop({ type: Orden, _id: false })
  public ordenes?: Orden[]
}

export const SociedadSchema = SchemaFactory.createForClass(Sociedad);