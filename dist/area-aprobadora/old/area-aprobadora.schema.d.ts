import { Document } from 'mongoose';
export declare type AreaAprobadoraOldDocument = AreaAprobadoraOld & Document;
declare class Suppliers {
    supplier?: string;
}
export declare class AreaAprobadoraOld {
    approvalarea: string;
    description: string;
    suppliers?: Suppliers[];
}
export declare const AreaAprobadoraOldSchema: import("mongoose").Schema<any>;
export {};
