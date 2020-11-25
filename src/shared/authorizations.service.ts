import { HttpService, Injectable } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Environments
import { LOGIN_CENTRAL_SERVER } from 'src/environment/environment.settings';
// Models
import { UserAuth } from 'src/models/user-auth.model';

@Injectable()
export class AuthorizationsService {

  constructor(
    private http: HttpService
  ) {}

  // Validar el token de usuari
  public validateToken(token: string): Observable<UserAuth> {
    const headers = {
      authorization: token
    };
    return this.http.get<UserAuth | never>(`${LOGIN_CENTRAL_SERVER}/api2/validatesession/invoice2pay`, { headers }).pipe(
      map(infoUser => {
        return new UserAuth(
          infoUser.data.user,
          infoUser.data.fullName,
          infoUser.data.authorizations ? infoUser.data.authorizations : {}
        )
      }),
      catchError(
        error =>{
          return throwError(error.response.data.message.toString());
        }
      )
    );
  }
}
