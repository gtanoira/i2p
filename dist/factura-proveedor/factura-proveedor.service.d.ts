import { Model } from 'mongoose';
import { FacturaProveedor, FacturaProveedorDocument } from './factura-proveedor.schema';
export declare class FacturaProveedorService {
    private facturaProveedorModel;
    constructor(facturaProveedorModel: Model<FacturaProveedorDocument>);
    addFacturaProveedor(factura: FacturaProveedor): Promise<FacturaProveedorDocument>;
    countFacturas(): Promise<number>;
    findAll(page: number, recsPerPage: number): Promise<FacturaProveedor[]>;
    findOne(id: string): Promise<FacturaProveedor>;
    patchFacturaProveedor(id: string, datosActualizar: {
        [key: string]: any;
    }): Promise<FacturaProveedorDocument>;
}
