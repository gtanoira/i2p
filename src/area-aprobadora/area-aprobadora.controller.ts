import { Controller, Get } from '@nestjs/common';
import { AreaAprobadora } from './area-aprobadora.schema';

// Services
import { AreaAprobadoraService } from './area-aprobadora.service';

@Controller('area_aprobadoras')
export class AreaAprobadoraController {

  constructor (
    private areaAprobadoraService: AreaAprobadoraService
  ) {}

  @Get()
  async findAll(): Promise<AreaAprobadora[]> {
    return await this.areaAprobadoraService.findAll();
  }

}

