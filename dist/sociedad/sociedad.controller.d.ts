import { SociedadService } from './sociedad.service';
import { Sociedad, SociedadDocument } from './sociedad.schema';
import { CreateOrdenDto } from 'src/dto/orden.dto';
import { CreateSociedadDto } from 'src/dto/sociedad.dto';
export declare class SociedadController {
    private sociedadService;
    constructor(sociedadService: SociedadService);
    findAll(): Promise<Sociedad[]>;
    addFactura(sociedadDto: CreateSociedadDto): Promise<SociedadDocument>;
    addOrden(sociedadId: string, ordenDto: CreateOrdenDto): Promise<SociedadDocument>;
}
