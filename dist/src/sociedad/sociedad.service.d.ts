import { Model } from 'mongoose';
import { Sociedad, SociedadDocument } from './sociedad.schema';
import { Orden } from 'src/models/orden.model';
export declare class SociedadService {
    private sociedadModel;
    constructor(sociedadModel: Model<SociedadDocument>);
    findAll(): Promise<Sociedad[]>;
    addSociedad(sociedad: Sociedad): Promise<SociedadDocument>;
    addOrden(sociedad: string, orden: Orden): Promise<SociedadDocument>;
}
