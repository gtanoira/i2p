import { Document } from 'mongoose';
export declare type SociedadDocument = Sociedad & Document;
export declare class Sociedad {
    sapId: string;
    name: string;
}
export declare const SociedadSchema: import("mongoose").Schema<any>;
