import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SociedadDocument = Sociedad & Document;

@Schema({
  collection: 'sociedades'
})
export class Sociedad {

  @Prop({type: String, index: {unique: true}})
  public sapId!: string;

  @Prop()
  public name!: string;
}

export const SociedadSchema = SchemaFactory.createForClass(Sociedad);