import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * GetToken busca dentro del req.headers el parámetro "authorization",
 * donde se envía el Django session ID que se necesita para validar el acceso a los datos.
 * Y devuelve el Django session Id o token.
 *
 */
export const GetToken = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {

    const request = ctx.switchToHttp().getRequest();
    // Obtener el token del request
    const token = request.headers.authorization;

    // Log del request
    console.log(`${new Date().toLocaleString('es-ar')}, ${request.method} ${request.url}`);

    return token ? token : null;
  },
);