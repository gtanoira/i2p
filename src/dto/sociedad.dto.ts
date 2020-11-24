import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSociedadDto {
  @IsString()
  @IsNotEmpty({message: 'El id SAP de la sociedad no puede estar vacío.'})
  public sapId!: string;
  
  @IsString()
  @IsNotEmpty({message: 'El nombre de la sociedad no puede estar vacío.'})
  public name!: string;
}
