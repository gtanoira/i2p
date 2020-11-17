/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Body, Controller, Get, HttpCode, Param, Post, ValidationPipe } from '@nestjs/common';
// Services
import { SociedadService } from './sociedad.service';
// Models & Schemas
import { Sociedad, SociedadDocument } from './sociedad.schema';
import { UserAuth } from 'src/models/user-auth.model';
// DTO's
import { CreateOrdenDto } from 'src/dto/orden.dto';
import { CreateSociedadDto } from 'src/dto/sociedad.dto';
// Decorators & Pipes
import { GetToken } from 'src/common/get-token.decorator';
import { ValidateTokenPipe } from 'src/common/validate-token.pipe';

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
  async findAll(
    @GetToken(new ValidateTokenPipe) infoUser: UserAuth
  ): Promise<Sociedad[]> {
    return await this.sociedadService.findAll();
  }

  // Alta
  @Post()
  @HttpCode(200)
  async addFactura(
    @GetToken(new ValidateTokenPipe) infoUser: UserAuth,
    @Body(new ValidationPipe()) sociedadDto: CreateSociedadDto
  ): Promise<SociedadDocument> {
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
    @GetToken(new ValidateTokenPipe) infoUser: UserAuth,
    @Param('sociedadId') sociedadId: string,
    @Body(new ValidationPipe()) ordenDto: CreateOrdenDto 
  ): Promise<SociedadDocument> {
    return await this.sociedadService.addOrden(sociedadId, ordenDto)
    .catch(error => {
      throw new BadRequestException(error.message);
    });
  }

}

