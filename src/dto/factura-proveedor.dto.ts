import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmpty, IsEnum, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsString, Length, ValidateNested } from 'class-validator';
import { monitorEventLoopDelay } from 'perf_hooks';

// Models
import { DocStatus } from 'src/models/constantes.model';

// Detalle Factura
export class DetalleFactura {

  @IsInt()
  @IsNotEmpty()
  public posicion!: number;

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
  @IsNotEmpty()
  public itemNeto!: number;

  @IsString()
  public sapTaxId?: string | null;

  @IsString()
  public sapTaxDesc?: string | null;

  @IsNumber()
  @IsNotEmpty()
  public itemIva!: number;
}

// Impuestos Facturas
export class ImpuestoFactura {

  @IsInt()
  @IsNotEmpty()
  public posicion!: number;

  @IsString()
  @IsNotEmpty()
  public sapTaxId!: string;

  @IsString()
  @IsEmpty()
  public sapTaxDesc?: string | null;

  @IsNumber()
  @IsNotEmpty()
  public totalImpuesto!: number;

  @IsBoolean()
  public debeCalcularse?: boolean;

}

// Log Facturas
export class LogFactura {

  @ApiProperty()
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

  @Type(() => Date)
  public fechaCtble?: Date;

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
  public monedaCotiz?: number;

  @IsNumber()
  public totalNeto?: number;
  
  @IsNumber()
  @IsEmpty()
  public sapDocId?: string;

  @Type(() => Date)
  @IsDate()
  public sapDocFecha?: Date;

  @IsString()
  @IsNotEmpty()
  public areaAprobadoraId!: string;

  @IsString()
  public areaAprobadoraDesc?: string;

  @IsString()
  @IsEnum(DocStatus, 
    {message: `El valor del docStatus es incorrecto: ${DocStatus}.`}
  )
  public docStatus!: string;

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

  // SETTERS
  setProveedorId() {
    this.proveedorId = `0000000000${this.proveedorId}`.substr(0, 10);
  }

}