import { FacturaProveedor, FacturaProveedorDocument } from './factura-proveedor.schema';
import { CreateFacturaProveedorDto } from '../dto/factura-proveedor.dto';
import { FacturaProveedorService } from './factura-proveedor.service';
import { FacturaProveedorOldService } from './old/factura-proveedor.service';
export declare class FacturaProveedorController {
    private facturaProveedorService;
    private facturaProveedorOldService;
    constructor(facturaProveedorService: FacturaProveedorService, facturaProveedorOldService: FacturaProveedorOldService);
    migrateFromOld(): Promise<{
        [key: string]: any;
    }>;
    addFactura(facturaProveedorDto: CreateFacturaProveedorDto): Promise<FacturaProveedorDocument>;
    getAll(): Promise<FacturaProveedor[]>;
    private mapNewDoc;
    private validateNumber;
    private toLogStatus;
    private toDocStatus;
    private validateFecha;
}
