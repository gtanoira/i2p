import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Length, ValidateNested } from 'class-validator';

// Models
import { DocStatus } from 'src/models/constantes.model';

// Detalle Factura
export class DetalleFactura {
  @IsString()
  @IsNotEmpty()
  public concepto!: string;

  @IsString()
  public descripcion?: string | null;
  
  @IsString()
  public mesServicio?: string;

  @IsString()
  public sapCentroCostoId?: string | null;

  @IsString()
  public sapCentroCostoDesc?: string | null;

  @IsString()
  public sapCtaCtbleId?: string | null;

  @IsString()
  public sapCtaCtbleDesc?: string | null;

  @IsString()
  public sapOrden?: string | null;

  @IsNumber()
  public itemNeto!: number | 0.00;

  @IsString()
  public sapTaxId!: string | 'CX';

  @IsString()
  public sapTaxDesc?: string | null;

  @IsNumber()
  public itemIva!: number | 0.00;
}

// Impuestos Facturas
export class ImpuestoFactura {
  @IsString()
  @IsNotEmpty()
  public sapTaxId!: string;

  @IsString()
  public sapTaxDesc?: string | null;

  @IsNumber()
  @IsNotEmpty()
  public totalImpuesto!: number;
}

// Log Facturas
export class LogFactura {
  @Type(() => Date)
  @IsDate()
  public fechaLog!: Date;

  @IsString()
  @IsEnum(DocStatus, 
    {message: `El valor del statusLog es incorrecto: ${DocStatus}.`}
  )
  public statusLog!: string;

  @IsString()
  @IsNotEmpty()
  public userLog!: string;
}

export class CreateFacturaProveedorDto {
  
  @IsString()
  @IsNotEmpty()
  public empresaId!: string;

  @IsString()
  public empresaDesc?: string;

  @IsString()
  @IsNumberString({ no_symbols: true })
  @Length(1, 10)
  public proveedorId!: string;

  @IsString()
  public proveedorDesc?: string;

  @Type(() => Date)
  @IsDate()
  public fechaDoc!: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  public fechaVtoDoc?: Date;

  @Type(() => Date)
  @IsDate()
  public fechaCtble!: Date;

  @IsString()
  @IsNotEmpty()
  public sapCbteId!: string;

  @IsString()
  public sapCbteDesc?: string;

  @IsString()
  public numeroFactura?: string | null;
 
  @IsString()
  @IsNotEmpty()
  public monedaDoc!: string;
 
  @IsNumber()
  @IsNotEmpty()
  public monedaCotiz!: number;

  @IsNumber()
  public totalNeto?: number;

  @IsString()
  @IsNotEmpty()
  public areaAprobadoraId!: string;

  @IsString()
  public areaAprobadoraDesc?: string;

  @IsOptional()
  public docStatus?: string;

  // Detalle Factura
  @Type(() => DetalleFactura)
  @ValidateNested({ each: true })
  public detalle?: DetalleFactura[];

  // Impuestos Factura
  @Type(() => ImpuestoFactura)
  @ValidateNested({ each: true })
  public impuestos?: ImpuestoFactura[];

  // Log Factura
  @Type(() => LogFactura)
  @ValidateNested({ each: true })
  public log?: LogFactura[];

}