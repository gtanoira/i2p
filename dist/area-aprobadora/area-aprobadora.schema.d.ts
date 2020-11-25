import { Document } from 'mongoose';
import { Proveedor } from '../models/proveedor.model';
export declare type AreaAprobadoraDocument = AreaAprobadora & Document;
export declare class AreaAprobadora {
    id: string;
    name: string;
    proveedores: Proveedor[];
}
export declare const AreaAprobadoraSchema: import("mongoose").Schema<any>;
