import { PipeTransform, Injectable, ArgumentMetadata, UnauthorizedException, HttpService } from '@nestjs/common';

// Models
import { UserAuth } from 'src/models/user-auth.model';
// Services
import { AuthorizationsService } from 'src/shared/authorizations.service';

@Injectable()
export class ValidateTokenPipe implements PipeTransform {
  // authorizationsService: AuthorizationsService;

  private http = new HttpService();
  private authorizationsService = new AuthorizationsService(this.http);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async transform(data: any, metadata: ArgumentMetadata): Promise<UserAuth> {
    const token = data;

    // Validar que el token contra LoginCentral
    return await this.authorizationsService.validateToken(token).toPromise()
      .then(infoUser => {
        // Request a los datos OK, devolver los datos del usuario
        return infoUser;
      })
      .catch(error => {
        // Request a los datos NO concedido. No autorizado
        throw new UnauthorizedException(error);
      }
    );
  }
}
