import { Document, Types } from 'mongoose';
export declare class DetalleFactura {
    concepto: string;
    descripcion?: string | null;
    mesServicio?: string;
    sapCentroCostoId?: string | null;
    sapCentroCostoDesc?: string | null;
    sapCtaCtbleId?: string | null;
    sapCtaCtbleDesc?: string | null;
    sapOrden?: string | null;
    itemNeto: number;
    sapTaxId?: string | null;
    sapTaxDesc?: string | null;
    itemIva: number;
}
export declare class ImpuestoFactura {
    sapTaxId: string;
    sapTaxDesc?: string | null;
    totalImpuesto: number;
}
export declare class LogFactura {
    fechaLog: Date;
    statusLog: string;
    userLog: string;
}
export declare class FacturaProveedor {
    migration_id?: Types.ObjectId;
    empresaId: string;
    empresaDesc?: string;
    proveedorId: string;
    proveedorDesc?: string;
    fechaDoc: Date;
    fechaCtble: Date;
    sapCbteId: string;
    sapCbteDesc?: string;
    numeroFactura?: string | null;
    monedaDoc: string;
    monedaCotiz: number;
    totalNeto?: number;
    sapDocId?: string;
    sapDocFecha?: Date;
    areaAprobadoraId: string;
    areaAprobadoraDesc?: string;
    docStatus?: string;
    pdfFile?: string;
    detalle?: DetalleFactura[];
    impuestos?: ImpuestoFactura[];
    log?: LogFactura[];
}
export declare type FacturaProveedorDocument = FacturaProveedor & Document;
export declare const FacturaProveedorSchema: import("mongoose").Schema<any>;
