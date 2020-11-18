import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Binary } from 'bson';
import { Document, Types } from 'mongoose';

export type FacturaImagenOldDocument = FacturaImagenOld & Document;

@Schema({
  collection: 'supplierinvoiceimagens'
})
export class FacturaImagenOld {
  @Prop()
  public _id: Types.ObjectId;

  @Prop()
  public pdf_file?: Binary;
}
export const FacturaImagenOldSchema = SchemaFactory.createForClass(FacturaImagenOld);
