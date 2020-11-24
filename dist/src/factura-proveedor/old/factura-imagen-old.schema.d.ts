import { Binary } from 'bson';
import { Document, Types } from 'mongoose';
export declare type FacturaImagenOldDocument = FacturaImagenOld & Document;
export declare class FacturaImagenOld {
    _id: Types.ObjectId;
    pdf_file?: Binary;
}
export declare const FacturaImagenOldSchema: import("mongoose").Schema<any>;
