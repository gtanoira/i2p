import { CreateCentroCostoDto } from './centro-costo.dto';
import { CreateOrdenDto } from './orden.dto';
export declare class CreateSociedadDto {
    sapId: string;
    name: string;
    centroCostos?: CreateCentroCostoDto[];
    ordenes?: CreateOrdenDto[];
}
