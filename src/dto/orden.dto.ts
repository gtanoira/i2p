import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrdenDto {
  
  @IsString()
  @IsNotEmpty({
    message: 'El id SAP de la orden no puede estar vacío.'
  })
  public sapId!: string;

  @IsString()
  @IsNotEmpty({
    message: 'El nombre de la orden no puede estar vacío.'
  })
  public name!: string;

}
