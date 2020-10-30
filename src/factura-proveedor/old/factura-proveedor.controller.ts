import { Controller, Get } from '@nestjs/common';

// Schemas
import { FacturaProveedorOld } from './factura-proveedor-old.schema';

// Services
import { FacturaProveedorOldService } from './factura-proveedor.service';

@Controller('factura_proveedores_old')
export class FacturaProveedorOldController {

  constructor (
    private facturaProveedorOldService: FacturaProveedorOldService
  ) {}

  @Get()
  async migrateReadAll(): Promise<FacturaProveedorOld[]> {
    return await this.facturaProveedorOldService.findAll();
  }
}
