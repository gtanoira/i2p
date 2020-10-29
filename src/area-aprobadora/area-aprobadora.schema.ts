import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Models
import { Proveedor } from '../models/proveedor.model';

export type AreaAprobadoraDocument = AreaAprobadora & Document;

@Schema({
  collection: 'area_aprobadoras'
})
export class AreaAprobadora {
  @Prop({required: true, unique: true})
  public id!: string;

  @Prop()
  public name!: string;

  // Detalle Factura
  @Prop({ type: Proveedor, _id: false })
  public proveedores?: Proveedor[]
}

export const AreaAprobadoraSchema = SchemaFactory.createForClass(AreaAprobadora);