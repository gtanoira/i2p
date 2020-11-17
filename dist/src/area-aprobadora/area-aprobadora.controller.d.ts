import { AreaAprobadora } from './area-aprobadora.schema';
import { AreaAprobadoraService } from './area-aprobadora.service';
import { AreaAprobadoraOldService } from './old/area-aprobadora.service';
export declare class AreaAprobadoraController {
    private areaAprobadoraService;
    private areaAprobadoraOldService;
    constructor(areaAprobadoraService: AreaAprobadoraService, areaAprobadoraOldService: AreaAprobadoraOldService);
    migrateFromOld(): Promise<{
        [key: string]: any;
    }>;
    findAll(): Promise<AreaAprobadora[]>;
}
