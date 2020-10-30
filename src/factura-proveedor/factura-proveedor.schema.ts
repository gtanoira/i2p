import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// Models
import { DocStatus, LogFacturaStatus } from '../models/constantes.model';

// Detalle Factura
export class DetalleFactura {

  @Prop()
  public posicion!: number;

  @Prop()
  public concepto!: string;

  @Prop({ default: '' })
  public descripcion?: string | null;
  
  @Prop({ default: null })
  public mesServicio?: Date | string;

  @Prop({ default: null })
  public sapCentroCostoId?: string | null;

  @Prop({ default: null })
  public sapCentroCostoDesc?: string | null;

  @Prop({ default: null })
  public sapCtaCtbleId?: string | null;

  @Prop({ default: null })
  public sapCtaCtbleDesc?: string | null;

  @Prop({ default: null })
  public sapOrden?: string | null;

  @Prop({ default: 0.00 })
  public itemNeto!: Types.Decimal128;

  @Prop({ default: null })
  public sapTaxId?: string | null;

  @Prop({ default: null })
  public sapTaxDesc?: string | null;

  @Prop({ default: 0.00 })
  public itemIva!: Types.Decimal128;
}

// Impuestos Facturas
export class ImpuestoFactura {

  @Prop()
  public posicion!: number;

  @Prop()
  public sapTaxId!: string;

  @Prop({ default: null })
  public sapTaxDesc?: string | null;

  @Prop({ default: 0.00 })
  public totalImpuesto!: Types.Decimal128;

  @Prop({ default: true })
  public debeCalcularse?: boolean;

}

// Log Facturas
export class LogFactura {

  @Prop({ default: Date.now() })
  public fechaLog!: Date;

  @Prop({ enum: LogFacturaStatus, default: LogFacturaStatus.CREADA })
  public statusLog!: LogFacturaStatus;

  @Prop()
  public userLog!: string;
}

export type FacturaProveedorDocument = FacturaProveedor & Document;

@Schema({
  collection: 'factura_proveedores'
})
export class FacturaProveedor {

  @Prop({required: true, unique: true})
  public migration_id!: Types.ObjectId;
  
  @Prop({required: true})
  public empresaId!: string;

  @Prop({default: null})
  public empresaDesc?: string;

  @Prop({required: true})
  public proveedorId!: string;

  @Prop({default: null})
  public proveedorDesc?: string;

  @Prop({required: true})
  public fechaDoc!: Date;

  @Prop({ default: null })
  public fechaCtble?: Date;

  @Prop({required: true})
  public sapCbteId!: string;

  @Prop({default: null})
  public sapCbteDesc?: string;

  @Prop({ default: null })
  public numeroFactura?: string | null;
 
  @Prop({ uppercase: true, match: /[A-Z]{3}/, default: 'ARS', required: true })
  public monedaDoc!: string;
 
  @Prop({ default: 0.00 })
  public monedaCotiz?: Types.Decimal128;

  @Prop({ default: 0.00 })
  public totalNeto?: Types.Decimal128;
  
  @Prop({ default: null })
  public sapDocId?: string;

  @Prop({ default: null})
  public sapDocFecha?: Date;

  @Prop({ uppercase: true, required: true })
  public areaAprobadoraId!: string;

  @Prop({default: null})
  public areaAprobadoraDesc?: string;

  @Prop({ enum: DocStatus, default: DocStatus.EN_CARGA, required: true })
  public docStatus!: DocStatus;

  // Detalle Factura
  @Prop({ type: DetalleFactura, _id: false })
  public detalle?: DetalleFactura[];

  // Impuestos Factura
  @Prop({ type: ImpuestoFactura, _id: false })
  public impuestos?: ImpuestoFactura[];

  // Log Factura
  @Prop({ type: LogFactura, _id: false })
  public log?: LogFactura[];

}

export const FacturaProveedorSchema = SchemaFactory.createForClass(FacturaProveedor);
