import { 
  Body,
  Controller,
  HttpCode,
  Post,
  ValidationPipe
} from '@nestjs/common';
import moment from 'moment';

//Decorators
import { GetToken } from 'src/common/get-token.decorator';
// Pipes
import { ValidateTokenPipe } from 'src/common/validate-token.pipe';
// DTOs
import { CreateFacturaProveedorDto } from 'src/dto/factura-proveedor.dto';
// Schemas & Models
import { LogFactura } from 'src/factura-proveedor/factura-proveedor.schema';
import { UserAuth } from 'src/models/user-auth.model';
// Services
import { EsquemaAprobacionService } from './esquema-aprobacion.service';

@Controller('esquema-aprobacion')
export class EsquemaAprobacionController {
  
  constructor (
    private facturaProveedorService: EsquemaAprobacionService
  ) {}
  
  // Alta de registros
  @Post()
  @HttpCode(200)
  async addRecord(
    @GetToken(new ValidateTokenPipe()) infoUser: UserAuth,  
    @Body(new ValidationPipe()) facturaProveedorDto: CreateFacturaProveedorDto
    // @UploadedFile() pdfFile
  ): Promise<{[key:string]: any}> {
    // Crear un LOG
    const newLog: LogFactura = {
      fechaLog: moment().toDate(),
      userLog: `${infoUser.user}${infoUser.isSuperUser() ? ' (SUPERUSER)' : ''}`,
      statusLog: 'CREADA',
      description: 'Se creó una nueva factura.'
    };
    const newFactura = { ...facturaProveedorDto, log: [newLog] };
    return await this.facturaProveedorService.addFacturaProveedor(newFactura)
    .then(factura => {
      return {
        _id: factura._id,
        message: "factura creada con éxito."
      }
    });
  }
}
