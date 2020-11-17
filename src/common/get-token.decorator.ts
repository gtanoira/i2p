import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetToken = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {

    const request = ctx.switchToHttp().getRequest();
    // Obtener el token del request
    const token = request.headers.authorization;

    return token ? token : null;
  },
);