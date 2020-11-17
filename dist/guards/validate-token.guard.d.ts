import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
export declare class ValidateTokenGuard implements CanActivate {
    private reflector;
    constructor(reflector: Reflector);
    private authorizationsService;
    canActivate(context: ExecutionContext): boolean;
}
