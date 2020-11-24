import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class ProveedorIdPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): string;
}
