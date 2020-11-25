import { Model } from 'mongoose';
import { AreaAprobadora, AreaAprobadoraDocument } from './area-aprobadora.schema';
export declare class AreaAprobadoraService {
    private areaAprobadoraModel;
    constructor(areaAprobadoraModel: Model<AreaAprobadoraDocument>);
    findAll(): Promise<AreaAprobadora[]>;
    addAreaAprobadora(area: AreaAprobadora): Promise<AreaAprobadoraDocument>;
}
