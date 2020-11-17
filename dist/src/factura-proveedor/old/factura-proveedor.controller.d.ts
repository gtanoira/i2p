import { FacturaProveedorOld } from './factura-proveedor-old.schema';
import { FacturaProveedorOldService } from './factura-proveedor.service';
export declare class FacturaProveedorOldController {
    private facturaProveedorOldService;
    constructor(facturaProveedorOldService: FacturaProveedorOldService);
    migrateReadAll(): Promise<FacturaProveedorOld[]>;
}
