import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Int32 } from 'bson';
import { Document } from 'mongoose';

// Detalle de aprobaciones
export class DetalleAprobaciones {

  @Prop({ type: Int32 })
  public prioridad!: number;

  @Prop({ uppercase: true })
  public areaAprobadoraId!: string;

  @Prop({default: null})
  public role!: string;
  
  @Prop({default: null})
  public fechaAprobado?: Date;
  
  @Prop({default: null})
  public userAprobado?: string;
}

@Schema({
  collection: 'esquema_aprobaciones'
})
export class EsquemaAprobacion {

  @Prop({ uppercase: true })
  public areaAprobadoraId!: string;

  @Prop({default: null})
  public areaAprobadoraDesc?: string;

  @Prop({ default: 0.00 })
  public importeMax?: number;
 
  @Prop({ uppercase: true, match: /[A-Z]{3}/, default: 'ARS' })
  public monedaId!: string;

  // Detalle Esquema
  @Prop({ type: DetalleAprobaciones, _id: false })
  public detalle?: DetalleAprobaciones[];
}

export type EsquemaAprobacionDocument = EsquemaAprobacion & Document;
export const EsquemaAprobacionSchema = SchemaFactory.createForClass(EsquemaAprobacion);
