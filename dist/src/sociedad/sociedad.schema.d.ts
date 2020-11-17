import { Document } from 'mongoose';
import { CentroCosto } from 'src/models/centro-costo.model';
import { Orden } from 'src/models/orden.model';
export declare type SociedadDocument = Sociedad & Document;
export declare class Sociedad {
    sapId: string;
    name: string;
    centroCostos?: CentroCosto[];
    ordenes?: Orden[];
}
export declare const SociedadSchema: import("mongoose").Schema<any>;
