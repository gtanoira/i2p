export declare class DetalleFactura {
    concepto: string;
    descripcion?: string | null;
    mesServicio?: string;
    sapCentroCostoId?: string | null;
    sapCentroCostoDesc?: string | null;
    sapCtaCtbleId?: string | null;
    sapCtaCtbleDesc?: string | null;
    sapOrden?: string | null;
    itemNeto: number | 0.00;
    sapTaxId: string | 'CX';
    sapTaxDesc?: string | null;
    itemIva: number | 0.00;
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
export declare class CreateFacturaProveedorDto {
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
    areaAprobadoraId: string;
    areaAprobadoraDesc?: string;
    docStatus?: string;
    detalle?: DetalleFactura[];
    impuestos?: ImpuestoFactura[];
    log?: LogFactura[];
}
