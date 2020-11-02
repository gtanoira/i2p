import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// Models

// Detalle Factura
class DetalleFactura {

  @Prop()
  public linenumber?: string;

  @Prop()
  public costcenter?: string;

  @Prop()
  public accountcode?: string;
  
  @Prop()
  public amount_item?: string | null;

  @Prop()
  public tax_percentage?: string;

  @Prop()
  public tax_amount?: string;

  @Prop()
  public order?: string;

  @Prop()
  public concept?: string;
  
  @Prop()
  public servicemonth?: string;

  @Prop()
  public description?: string;
}

// Impuestos Facturas
class ImpuestoFactura {

  @Prop()
  public taxcode?: string;

  @Prop()
  public taxamount?: string;

  @Prop()
  public regulartax?: string;

}

// Log Facturas
class LogFactura {

  @Prop()
  public update_date?: string;

  @Prop()
  public action!: string;

  @Prop()
  public description!: string;
}

export type FacturaProveedorOldDocument = FacturaProveedorOld & Document;

@Schema({
  collection: 'supplierinvoices'
})
export class FacturaProveedorOld {
  @Prop()
  public _id: Types.ObjectId;

  @Prop()
  public maxdatetorelease?: Date;

  @Prop()
  public supplier!: string;

  @Prop()
  public approvalarea?: string;
  
  @Prop()
  public company!: string;

  @Prop()
  public accountingdate?: string | null;

  @Prop()
  public documentdate?: string | null;

  @Prop()
  public documenttype!: string;

  @Prop()
  public documentnumber?: string | null;

  @Prop()
  public currency!: string;
  
  @Prop()
  public netamountinvoice?: string;
  
  @Prop()
  public totaltax?: string;
    
  @Prop()
  public totalinvoice?: string;
    
  @Prop()
  public approver_total?: string;
  
  @Prop()
  public aplevel?: string;
  
  @Prop()
  public approver1?: string;
  
  @Prop()
  public approver1date?: string;
  
  @Prop()
  public approver1user?: string;
  
  @Prop()
  public release1?: string;
  
  @Prop()
  public approver2?: string;
  
  @Prop()
  public approver2date?: string;
  
  @Prop()
  public approver2user?: string;
  
  @Prop()
  public release2?: string;
  
  @Prop()
  public approver3?: string;
  
  @Prop()
  public approver3date?: string;
  
  @Prop()
  public approver3user?: string;
  
  @Prop()
  public release3?: string;
  
  @Prop()
  public approver4?: string;
  
  @Prop()
  public approver4date?: string;
  
  @Prop()
  public approver4user?: string;
  
  @Prop()
  public release4?: string;
  
  @Prop()
  public approver5?: string;
  
  @Prop()
  public approver5date?: string;
  
  @Prop()
  public approver5user?: string;
  
  @Prop()
  public release5?: string;
  
  @Prop()
  public createdby?: string;
    
  @Prop()
  public exchangerate?: string;
    
  @Prop()
  public sap_id?: string;
    
  @Prop()
  public sap_status?: string;
    
  @Prop()
  public sap_date?: string;

  @Prop()
  public createddate?: Date;

  // Log Factura
  @Prop({ type: LogFactura })
  public general_log?: LogFactura[]
  
  // Detalle Factura
  @Prop({ type: DetalleFactura })
  public detail?: DetalleFactura[]
    
  // Impuestos
  @Prop({ type: ImpuestoFactura })
  public detailtax?: ImpuestoFactura[]
}
export const FacturaProveedorOldSchema = SchemaFactory.createForClass(FacturaProveedorOld);
