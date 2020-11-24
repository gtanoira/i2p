/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, ConflictException, Controller, Get, HttpCode, Post, ValidationPipe } from '@nestjs/common';
// Services
import { SociedadService } from './sociedad.service';
// Models & Schemas
import { Sociedad, SociedadDocument } from './sociedad.schema';
import { UserAuth } from 'src/models/user-auth.model';
// DTO's
import { CreateSociedadDto } from 'src/dto/sociedad.dto';
// Decorators & Pipes
import { GetToken } from 'src/common/get-token.decorator';
import { ValidateTokenPipe } from 'src/common/validate-token.pipe';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, map, mergeMap, toArray } from 'rxjs/operators';

@Controller('sociedades')
export class SociedadController {

  constructor (
    private sociedadService: SociedadService
  ) {}

  // Obtener todos los registros
  @Get()
  async findAll(
    @GetToken(new ValidateTokenPipe) infoUser: UserAuth
  ): Promise<Sociedad[]> {
    return await this.sociedadService.findAll();
  }

  // Alta de sociedades: se pueden envaiar multiples sociedades dentro de un array
  @Post()
  @HttpCode(200)
  addFactura(
    @GetToken(new ValidateTokenPipe) infoUser: UserAuth,
    @Body(new ValidationPipe()) sociedadDto: CreateSociedadDto[]
  ): Observable<SociedadDocument[]> {

    const altaSociedades = from(sociedadDto).pipe(
      concatMap(sociedad => {
        return this.sociedadService.addSociedad(sociedad);
      }),
      catchError(
        error => throwError(error.message)
      )
    );

    return altaSociedades.pipe(
      toArray(),
      catchError(
        error => {
          throw new ConflictException(error);
        }
      )
    );
  }
}

