import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { AuthorizationsService } from 'src/shared/authorizations/authorizations.service';
export declare class ValidationTokenPipe implements PipeTransform {
    private authorizationsService;
    constructor(authorizationsService: AuthorizationsService);
    transform(data: any, metadata: ArgumentMetadata): void;
}
