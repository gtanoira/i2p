import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCentroCostoDto {
  
  @IsString()
  @IsNotEmpty({
    message: 'El id SAP del centro de costo no puede estar vacío.'
  })
  public sapId!: string;

  @IsString()
  @IsNotEmpty({
    message: 'El nombre del centro de costo no puede estar vacío.'
  })
  public name!: string;

}