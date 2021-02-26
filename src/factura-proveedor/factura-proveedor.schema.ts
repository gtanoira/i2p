import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Document, Types } from 'mongoose';

// Models
import { DocStatus } from '../models/constantes.model';

// Detalle Factura
export class DetalleFactura {

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
  public sapTaxId!: string;

  @Prop({ default: null })
  public sapTaxDesc?: string | null;

  @Prop({ default: 0.00 })
  public totalImpuesto!: number;

}

// Log Facturas
export class LogFactura {

  @Prop()
  public fechaLog!: Date;

  @Prop({ enum: DocStatus, default: 'CREADA' })
  public statusLog!: string;

  @Prop()
  public userLog!: string;
  
  @Prop()
  public description?: string;
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

  @Prop({
    set: (value: string) => {
      const data = `0000000000${value.trim()}`;
      return data.substr(data.length-10, data.length);
    }
  })
  public proveedorId!: string;

  @Prop({default: null})
  public proveedorDesc?: string;

  @Prop()
  public fechaDoc!: Date;

  @Prop()
  public fechaCtble!: Date;

  @Prop()
  public sapCbteId!: string;

  @Prop({default: null})
  public sapCbteDesc?: string;

  @Prop({ default: null })
  public numeroFactura?: string | null;
 
  @Prop({ uppercase: true, match: /[A-Z]{3}/, default: 'ARS' })
  public monedaDoc!: string;
 
  @Prop({ default: 1 })
  public monedaCotiz!: number;

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

  @Prop({ enum: DocStatus, default: 'CREADA' })
  public docStatus?: string;

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

export type FacturaProveedorToResponse = {
  totalFacturas: number,
  facturas: FacturaProveedor[]
};