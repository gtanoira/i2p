import { SociedadService } from './sociedad.service';
import { Sociedad, SociedadDocument } from './sociedad.schema';
import { UserAuth } from 'src/models/user-auth.model';
import { CreateSociedadDto } from 'src/dto/sociedad.dto';
import { Observable } from 'rxjs';
export declare class SociedadController {
    private sociedadService;
    constructor(sociedadService: SociedadService);
    findAll(infoUser: UserAuth): Promise<Sociedad[]>;
    addFactura(infoUser: UserAuth, sociedadDto: CreateSociedadDto[]): Observable<SociedadDocument[]>;
}
