/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Patch } from '@nestjs/common';
import { AreaAprobadora } from './area-aprobadora.schema';

// Services
import { AreaAprobadoraService } from './area-aprobadora.service';
import { AreaAprobadoraOldService } from './old/area-aprobadora.service';
// Models
import { Proveedor } from '../models/proveedor.model';
import { UserAuth } from 'src/models/user-auth.model';
// Decorators & Pipes
import { GetToken } from 'src/common/get-token.decorator';
import { ValidateTokenPipe } from 'src/common/validate-token.pipe';

@Controller('area_aprobadoras')
export class AreaAprobadoraController {

  constructor (
    private areaAprobadoraService: AreaAprobadoraService,
    private areaAprobadoraOldService: AreaAprobadoraOldService
  ) {}

  @Patch('/migrate')
  async migrateFromOld(
    @GetToken(new ValidateTokenPipe) infoUser: UserAuth
  ): Promise<{[key:string]: any}> {

    // Mensaje de retorno del request
    let rtnMessage = '';
    let docsInsertados = 0;

    // Leer los docs desde Juan Carta
    const oldDocs = await this.areaAprobadoraOldService.findAll();

    if (oldDocs) {
      // Grabar los docs en i2p_dbase
      oldDocs.forEach(async (doc) => {
        // Armar los proveedores
        const proveedores: Proveedor[] = []; 
        if (doc.suppliers.length > 0 ) {
          doc.suppliers.forEach( supplier => {
            const proveedor = supplier.supplier.split(/\:/);
            if (proveedor) {
              proveedores.push({
                sapId: proveedor[0],
                name: proveedor[1]
              });
            }
          });
        }
        // Armar el nuevo doc
        const newDoc: AreaAprobadora = {
          id: doc.approvalarea,
          name: doc.description,
          proveedores
        };

        // Grabar el nuevo doc
        await this.areaAprobadoraService.addAreaAprobadora(newDoc)
          .then(() => {
            docsInsertados += 1;
          })
          .catch(error => {
            console.log('*** ERROR: ', error);
            rtnMessage += `${newDoc.id}/${newDoc.name}, `;
          });
      });
      rtnMessage = rtnMessage === '' ? `Migración completada con éxito. Se migraron: ${docsInsertados} areas` : `Hubo errores: ${rtnMessage}`;
    }
    return {message: rtnMessage};
  }

  @Get()
  async findAll(
    @GetToken(new ValidateTokenPipe) infoUser: UserAuth
  ): Promise<AreaAprobadora[]> {
    return await this.areaAprobadoraService.findAll();
  }
}

