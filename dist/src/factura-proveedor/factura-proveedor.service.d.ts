import { Model } from 'mongoose';
import { FacturaProveedor, FacturaProveedorDocument } from './factura-proveedor.schema';
export declare class FacturaProveedorService {
    private facturaProveedorModel;
    constructor(facturaProveedorModel: Model<FacturaProveedorDocument>);
    findAll(): Promise<FacturaProveedor[]>;
    findOne(id: string): Promise<FacturaProveedor>;
    addFacturaProveedor(factura: FacturaProveedor): Promise<FacturaProveedorDocument>;
    patchFacturaProveedor(id: string, datosActualizar: {
        [key: string]: any;
    }): Promise<FacturaProveedorDocument>;
}
