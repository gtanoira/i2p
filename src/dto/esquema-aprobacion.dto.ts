import { Type } from 'class-transformer';
import { 
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested
} from 'class-validator';
import { UserRoles } from 'src/models/user.roles';

// Detalle de aprobaciones
export class DetalleEsquema {

  @IsInt()
  @Min(1)
  public prioridad!: number;
  
  @IsString()
  @IsNotEmpty()
  public areaAprobadoraId!: string;
  
  @IsString()
  @IsNotEmpty()
  @IsEnum(UserRoles, 
    {message: `El valor del role es incorrecto.`}
  )
  public role!: string;
  
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  public fechaAprobado?: Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public userAprobado?: string;
}

export class EsquemaAprobacionDto {
  
  @IsString()
  @IsNotEmpty()
  public areaAprobadoraId!: string;

  @IsString()
  public areaAprobadoraDesc?: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  public importeMax!: number;
 
  @IsString()
  @IsNotEmpty()
  public monedaId!: string;

  // Detalle esquema de aprobaciones
  @IsNotEmpty()
  @Type(() => DetalleEsquema)
  @ValidateNested({ each: true })
  public detalleAprobaciones!: DetalleEsquema[];

}