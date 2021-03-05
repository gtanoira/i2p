import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class FacturaProveedorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    
    // Obtener el body con los datos necesario
    const factura = context.getArgByIndex(0).body;

    // Proveedor Id
    const proveedorId = `0000000000${factura['proveedorId'].trim()}`;
    factura['proveedorId'] = proveedorId.substr(proveedorId.length-10, proveedorId.length);
    
    // Retornar el Body recibido
    return next
      .handle()
      .pipe(
        map(() => { factura }),
      );
  }
}