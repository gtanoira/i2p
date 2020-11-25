import { HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserAuth } from 'src/models/user-auth.model';
export declare class AuthorizationsService {
    private http;
    constructor(http: HttpService);
    validateToken(token: string): Observable<UserAuth>;
}
