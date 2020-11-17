import { Model } from 'mongoose';
import { FacturaProveedorOld, FacturaProveedorOldDocument } from './factura-proveedor-old.schema';
export declare class FacturaProveedorOldService {
    private facturaProveedorOldModel;
    constructor(facturaProveedorOldModel: Model<FacturaProveedorOldDocument>);
    findAll(): Promise<FacturaProveedorOld[]>;
}
