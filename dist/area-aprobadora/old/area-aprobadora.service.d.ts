import { Model } from 'mongoose';
import { AreaAprobadoraOld, AreaAprobadoraOldDocument } from './area-aprobadora.schema';
export declare class AreaAprobadoraOldService {
    private areaAprobadoraOldModel;
    constructor(areaAprobadoraOldModel: Model<AreaAprobadoraOldDocument>);
    findAll(): Promise<AreaAprobadoraOld[]>;
}
