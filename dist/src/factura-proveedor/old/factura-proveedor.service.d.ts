import { Model, Types } from 'mongoose';
import { Binary } from 'bson';
import { FacturaProveedorOld, FacturaProveedorOldDocument } from './factura-proveedor-old.schema';
import { FacturaImagenOldDocument } from './factura-imagen-old.schema';
export declare class FacturaProveedorOldService {
    private facturaProveedorOldModel;
    private facturaImagenOldModel;
    constructor(facturaProveedorOldModel: Model<FacturaProveedorOldDocument>, facturaImagenOldModel: Model<FacturaImagenOldDocument>);
    findAll(): Promise<FacturaProveedorOld[]>;
    getPdfFile(id: Types.ObjectId): Promise<Binary | null>;
}
