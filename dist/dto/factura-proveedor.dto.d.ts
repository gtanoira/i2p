export declare class DetalleFactura {
    posicion: number;
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
    posicion: number;
    sapTaxId: string;
    sapTaxDesc?: string | null;
    totalImpuesto: number;
    debeCalcularse?: boolean;
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
    fechaCtble?: Date;
    sapCbteId: string;
    sapCbteDesc?: string;
    numeroFactura?: string | null;
    monedaDoc: string;
    monedaCotiz?: number;
    totalNeto?: number;
    sapDocId?: string;
    sapDocFecha?: Date;
    areaAprobadoraId: string;
    areaAprobadoraDesc?: string;
    docStatus: string;
    detalle?: DetalleFactura[];
    impuestos?: ImpuestoFactura[];
    log?: LogFactura[];
    setProveedorId(): void;
}
