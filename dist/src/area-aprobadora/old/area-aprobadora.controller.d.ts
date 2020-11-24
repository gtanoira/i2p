import { AreaAprobadoraOld } from './area-aprobadora.schema';
import { AreaAprobadoraOldService } from './area-aprobadora.service';
export declare class AreaAprobadoraOldController {
    private areaAprobadoraOldService;
    constructor(areaAprobadoraOldService: AreaAprobadoraOldService);
    migrateReadAll(): Promise<AreaAprobadoraOld[]>;
}
