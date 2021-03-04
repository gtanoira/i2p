import { 
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UnauthorizedException,
  ValidationPipe
} from '@nestjs/common';

//Decorators
import { GetToken } from 'src/common/get-token.decorator';
// Pipes
import { ValidateTokenPipe } from 'src/common/validate-token.pipe';
// DTOs
import { EsquemaAprobacionDto } from 'src/dto/esquema-aprobacion.dto';
// Schemas & Models
import { UserAuth } from 'src/models/user-auth.model';
import { DetalleAprobaciones, EsquemaAprobacion } from './esquema-aprobacion.schema';
// Services
import { AreaAprobadoraService } from 'src/area-aprobadora/area-aprobadora.service';
import { EsquemaAprobacionService } from './esquema-aprobacion.service';

@Controller('esquema_aprobaciones')
export class EsquemaAprobacionController {
  
  constructor (
    private areaAprobadoraService: AreaAprobadoraService,
    private esquemaAprobacionService: EsquemaAprobacionService
  ) {}
  
  // Alta de registros
  @Post()
  @HttpCode(200)
  async addRecord(
    @GetToken(new ValidateTokenPipe()) infoUser: UserAuth,  
    @Body(new ValidationPipe()) esquemaAprobacionDto: EsquemaAprobacionDto
  ): Promise<{[key:string]: any}> {

    // Validar que el usuario sea un SUPERUSER
    if (infoUser.isSuperUser) {

      // Validar el areaAprobadora
      const esquema = esquemaAprobacionDto;
      await this.areaAprobadoraService.findOneRecord(esquema.areaAprobadoraId)
      .then(data => esquema['areaAprobadoraDesc'] = data.name)
      .catch(() => {
        throw new BadRequestException(`El area aprobadora id del esquema es inexistente (${esquema.areaAprobadoraId}).`);
      });

      // Ordenar el detalle por prioridad
      esquema['detalleAprobaciones'] = esquema.detalleAprobaciones.sort(this.sortArray);

      // Validar las areas aprobadoras en los detalles de aprobaciones
      const rtnError = [];
      for (const el of esquema.detalleAprobaciones) {
        await this.areaAprobadoraService.findOneRecord(el.areaAprobadoraId)
        .then(data => {
          if (data == null) {
            rtnError.push(`${el.prioridad}. area aprobadora inexistente (${el.areaAprobadoraId})`)
          }
        })
        .catch(() => {
          rtnError.push(`${el.prioridad}. area aprobadora inexistente (${el.areaAprobadoraId})`)
        });
      };
      if (rtnError.length > 0) {
        throw new BadRequestException(rtnError);
      }

      return await this.esquemaAprobacionService.addRecord(esquema)
      .then(esquema => {
        return {
          _id: esquema._id,
          message: "esquema de aprobación creado con éxito."
        }
      });
    } else {
      throw new UnauthorizedException('API-0027(E): no posee acceso a esta api.');
    }
  }

  // Obtener todos los registros
  @Get()
  async getAllRecords(
    @GetToken(new ValidateTokenPipe) infoUser: UserAuth
  ): Promise<EsquemaAprobacion[]> {
    return await this.esquemaAprobacionService.getAllRecords();
  }

  // Sort para array de objetos
  private sortArray(a: DetalleAprobaciones, b: DetalleAprobaciones) {
    const prioridadA = a.prioridad;
    const prioridadB = b.prioridad;
  
    let comparison = 0;
    if (prioridadA > prioridadB) {
      comparison = 1;
    } else if (prioridadA < prioridadB) {
      comparison = -1;
    }
    return comparison;
  }
}
