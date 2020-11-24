import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { Sociedad, SociedadDocument } from './sociedad.schema';
export declare class SociedadService {
    private sociedadModel;
    constructor(sociedadModel: Model<SociedadDocument>);
    findAll(): Promise<Sociedad[]>;
    addSociedad(sociedad: Sociedad): Observable<SociedadDocument>;
}
