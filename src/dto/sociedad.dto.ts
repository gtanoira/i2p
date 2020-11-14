import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

// DTO's
import { CreateCentroCostoDto } from './centro-costo.dto';
import { CreateOrdenDto } from './orden.dto';

export class CreateSociedadDto {
  
  @IsString()
  @IsNotEmpty(
    {message: 'El id SAP de la sociedad no puede estar vacío.'}
  )
  public sapId!: string;
  
  @IsString()
  @IsNotEmpty(
    {message: 'El nombre de la sociedad no puede estar vacío.'}
  )
  public name!: string;

  // Centro de costos
  @Type(() => CreateOrdenDto)
  @ValidateNested({ each: true })
  public centroCostos?: CreateCentroCostoDto[];

  // Ordenes
  @Type(() => CreateOrdenDto)
  @ValidateNested({ each: true })
  public ordenes?: CreateOrdenDto[];

}