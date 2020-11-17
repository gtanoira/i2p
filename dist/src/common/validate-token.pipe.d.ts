import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { UserAuth } from 'src/models/user-auth.model';
export declare class ValidateTokenPipe implements PipeTransform {
    private http;
    private authorizationsService;
    transform(data: any, metadata: ArgumentMetadata): Promise<UserAuth>;
}
