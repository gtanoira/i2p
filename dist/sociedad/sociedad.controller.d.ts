import { SociedadService } from './sociedad.service';
import { Sociedad, SociedadDocument } from './sociedad.schema';
import { UserAuth } from 'src/models/user-auth.model';
import { CreateOrdenDto } from 'src/dto/orden.dto';
import { CreateSociedadDto } from 'src/dto/sociedad.dto';
export declare class SociedadController {
    private sociedadService;
    constructor(sociedadService: SociedadService);
    findAll(infoUser: UserAuth): Promise<Sociedad[]>;
    addFactura(infoUser: UserAuth, sociedadDto: CreateSociedadDto): Promise<SociedadDocument>;
    addOrden(infoUser: UserAuth, sociedadId: string, ordenDto: CreateOrdenDto): Promise<SociedadDocument>;
}
