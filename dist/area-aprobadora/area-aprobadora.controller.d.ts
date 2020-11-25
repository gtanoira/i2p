import { AreaAprobadora } from './area-aprobadora.schema';
import { AreaAprobadoraService } from './area-aprobadora.service';
import { AreaAprobadoraOldService } from './old/area-aprobadora.service';
import { UserAuth } from 'src/models/user-auth.model';
export declare class AreaAprobadoraController {
    private areaAprobadoraService;
    private areaAprobadoraOldService;
    constructor(areaAprobadoraService: AreaAprobadoraService, areaAprobadoraOldService: AreaAprobadoraOldService);
    migrateFromOld(infoUser: UserAuth): Promise<{
        [key: string]: any;
    }>;
    findAll(infoUser: UserAuth): Promise<AreaAprobadora[]>;
}
