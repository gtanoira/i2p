import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AreaAprobadoraOldDocument = AreaAprobadoraOld & Document;

// Suppliers
class Suppliers {
  @Prop({ _id: false })
  public supplier?: string;
}

@Schema({
  collection: 'approvalareas'
})
export class AreaAprobadoraOld {
  @Prop()
  public approvalarea!: string;

  @Prop()
  public description!: string;

  // Detalle Factura
  @Prop({ type: Suppliers, _id: false })
  public suppliers?: Suppliers[]
}

export const AreaAprobadoraOldSchema = SchemaFactory.createForClass(AreaAprobadoraOld);