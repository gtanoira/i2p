import { BadRequestException, Body, Controller, Get, HttpCode, Param, Post, ValidationPipe } from '@nestjs/common';
// Services
import { SociedadService } from './sociedad.service';
// Models & Schemas
import { Sociedad, SociedadDocument } from './sociedad.schema';
// DTO's
import { CreateOrdenDto } from 'src/dto/orden.dto';
import { CreateSociedadDto } from 'src/dto/sociedad.dto';

@Controller('sociedades')
export class SociedadController {

  constructor (
    private sociedadService: SociedadService
  ) {}

  /*
      SOCIEDADES
  */
  // Obtener todos los registros
  @Get()
  async findAll(): Promise<Sociedad[]> {
    return await this.sociedadService.findAll();
  }

  // Alta de facturas
  @Post()
  @HttpCode(200)
  async addFactura(@Body(new ValidationPipe()) sociedadDto: CreateSociedadDto ): Promise<SociedadDocument> {
    return await this.sociedadService.addSociedad(sociedadDto)
    .catch(error => {
      throw new BadRequestException(error.message);
    });
  }
  
  /*
      SOCIEDADES -> ORDENES
  */
  // Alta de ordenes para una sociedad
  @Post('/:sociedadId/ordenes')
  @HttpCode(200)
  async addOrden(
    @Param('sociedadId') sociedadId: string,
    @Body(new ValidationPipe()) ordenDto: CreateOrdenDto 
  ): Promise<SociedadDocument> {
    return await this.sociedadService.addOrden(sociedadId, ordenDto)
    .catch(error => {
      throw new BadRequestException(error.message);
    });
  }

}

