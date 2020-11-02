import { Model } from 'mongoose';
import { FacturaProveedor, FacturaProveedorDocument } from './factura-proveedor.schema';
export declare class FacturaProveedorService {
    private facturaProveedorModel;
    constructor(facturaProveedorModel: Model<FacturaProveedorDocument>);
    findAll(): Promise<FacturaProveedor[]>;
    addFacturaProveedor(factura: FacturaProveedor): Promise<FacturaProveedorDocument>;
}
