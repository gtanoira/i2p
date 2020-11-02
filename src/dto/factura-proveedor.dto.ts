import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

// Models
import { DocStatus, LogFacturaStatus } from 'src/models/constantes.model';

// Detalle Factura
export class DetalleFactura {

  @ApiProperty()
  public posicion!: number;

  @ApiProperty()
  public concepto!: string;

  @ApiProperty({ default: '' })
  public descripcion?: string | null;
  
  @ApiProperty({ default: null })
  public mesServicio?: Date | string;

  @ApiProperty({ default: null })
  public sapCentroCostoId?: string | null;

  @ApiProperty({ default: null })
  public sapCentroCostoDesc?: string | null;

  @ApiProperty({ default: null })
  public sapCtaCtbleId?: string | null;

  @ApiProperty({ default: null })
  public sapCtaCtbleDesc?: string | null;

  @ApiProperty({ default: null })
  public sapOrden?: string | null;

  @ApiProperty({ default: 0.00 })
  public itemNeto!: number;

  @ApiProperty({ default: null })
  public sapTaxId?: string | null;

  @ApiProperty({ default: null })
  public sapTaxDesc?: string | null;

  @ApiProperty({ default: 0.00 })
  public itemIva!: number;
}

// Impuestos Facturas
export class ImpuestoFactura {

  @ApiProperty()
  public posicion!: number;

  @ApiProperty()
  public sapTaxId!: string;

  @ApiProperty({ default: null })
  public sapTaxDesc?: string | null;

  @ApiProperty({ default: 0.00 })
  public totalImpuesto!: number;

  @ApiProperty({ default: true })
  public debeCalcularse?: boolean;

}

// Log Facturas
export class LogFactura {

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  public fechaLog!: Date;

  @ApiProperty({ enum: LogFacturaStatus, default: 'CREADA' })
  public statusLog!: string;

  @ApiProperty()
  public userLog!: string;
}

export class CreateFacturaProveedorDto {
  
  @ApiProperty()
  public empresaId!: string;

  @ApiProperty({default: null})
  public empresaDesc?: string;

  @ApiProperty()
  public proveedorId!: string;

  @ApiProperty({default: null})
  public proveedorDesc?: string;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  public fechaDoc!: Date;

  @ApiProperty({ default: null })
  @Type(() => Date)
  public fechaCtble?: Date;

  @ApiProperty()
  public sapCbteId!: string;

  @ApiProperty({default: null})
  public sapCbteDesc?: string;

  @ApiProperty({ default: null })
  public numeroFactura?: string | null;
 
  @ApiProperty({ default: 'ARS' })
  public monedaDoc!: string;
 
  @ApiProperty({ default: 0.00 })
  public monedaCotiz?: number;

  @ApiProperty({ default: 0.00 })
  public totalNeto?: number;
  
  @ApiProperty({ default: null })
  public sapDocId?: string;

  @ApiProperty({ default: null})
  @Type(() => Date)
  public sapDocFecha?: Date;

  @ApiProperty()
  public areaAprobadoraId!: string;

  @ApiProperty({default: null})
  public areaAprobadoraDesc?: string;

  @ApiProperty({ enum: DocStatus, default: 'EN_CARGA' })
  public docStatus!: string;

  // Detalle Factura
  @ApiProperty({ type: DetalleFactura, default: [] })
  public detalle?: DetalleFactura[];

  // Impuestos Factura
  @ApiProperty({ type: ImpuestoFactura, default: [] })
  public impuestos?: ImpuestoFactura[];

  // Log Factura
  @ApiProperty({ type: LogFactura, default: [] })
  public log?: LogFactura[];

}