import { Controller, Get } from '@nestjs/common';
import { AreaAprobadoraOld } from './area-aprobadora.schema';

// Services
import { AreaAprobadoraOldService } from './area-aprobadora.service';

@Controller('area_aprobadoras_old')
export class AreaAprobadoraOldController {

  constructor (
    private areaAprobadoraOldService: AreaAprobadoraOldService
  ) {}

  @Get()
  async migrateReadAll(): Promise<AreaAprobadoraOld[]> {
    return await this.areaAprobadoraOldService.findAll();
  }

}

