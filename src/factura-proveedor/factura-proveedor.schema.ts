import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
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
  public mesServicio?: string;

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
  public itemNeto!: number;

  @Prop({ default: null })
  public sapTaxId?: string | null;

  @Prop({ default: null })
  public sapTaxDesc?: string | null;

  @Prop({ default: 0.00 })
  public itemIva!: number;
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
  public totalImpuesto!: number;

  @Prop({ default: true })
  public debeCalcularse?: boolean;

}

// Log Facturas
export class LogFactura {

  @Prop()
  public fechaLog!: Date;

  @Prop({ enum: LogFacturaStatus, default: 'CREADA' })
  public statusLog!: string;

  @Prop()
  public userLog!: string;
}

@Schema({
  collection: 'factura_proveedores'
})
export class FacturaProveedor {

  @Prop()
  public migration_id?: Types.ObjectId;
  
  @Prop()
  public empresaId!: string;

  @Prop({default: null})
  public empresaDesc?: string;

  @Prop()
  public proveedorId!: string;

  @Prop({default: null})
  public proveedorDesc?: string;

  @Prop()
  public fechaDoc!: Date;

  @Prop({ default: null })
  public fechaCtble?: Date;

  @Prop()
  public sapCbteId!: string;

  @Prop({default: null})
  public sapCbteDesc?: string;

  @Prop({ default: null })
  public numeroFactura?: string | null;
 
  @Prop({ uppercase: true, match: /[A-Z]{3}/, default: 'ARS' })
  public monedaDoc!: string;
 
  @Prop({ default: 0.00 })
  public monedaCotiz?: number;

  @Prop({ default: 0.00 })
  public totalNeto?: number;
  
  @Prop({ default: null })
  public sapDocId?: string;

  @Prop({ default: null})
  @Type(() => Date)
  public sapDocFecha?: Date;

  @Prop({ uppercase: true })
  public areaAprobadoraId!: string;

  @Prop({default: null})
  public areaAprobadoraDesc?: string;

  @Prop({ enum: DocStatus, default: 'EN_CARGA' })
  public docStatus!: string;

  @Prop({ default: null })
  public pdfFile?: string;

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

export type FacturaProveedorDocument = FacturaProveedor & Document;
export const FacturaProveedorSchema = SchemaFactory.createForClass(FacturaProveedor);
