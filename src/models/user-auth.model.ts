/**
 * ROLES:
 * Existen varios tipo de roles en el sistema:
 *   CARGADOR: puede cargar facturas de su área.
 *   VISUALIZADOR: puede ver facturas de todas las áreas.
 *   GERENTE: es el que aprueba las facturas de su área
 *   DIRECTOR: es el que aprueba las facturas de su área
 *   VP
 *   GTEGRAL
 *   ADMINISTRADOR: encargado de enviar las facturas a SAP. Administra el backend.
 *   PAGADOR: encargado de cargar y enviar las retenciones efectuadas a las facturas (esto se realiza después de enviar las facturas a SAP).
 *   SUPERUSER: superusuario, tiene todos los poderes
 * 
 * Los roles de un usuario se proveen a través del sistema LOGIN CENTRAL, al loguearse el usuario al sistema.
 * También pueden obtenerse ejecutando la api /api2/validatesession/<sistema, ej.: invoice2pay>
 * Estos roles vienen como parte de la info del usuario en un objeto JSON:
 *   {
 *     ...
 *     authorizations: {
 *       role: 'CARGADOR,ADMINISTADOR,etc..'
 *     }
 *  }

 */
export class UserAuth {
  user: string;
  fullName: string;
  authorizations?: {[key:string]: any};

  constructor(user: string, fullName: string, auths?: {[key:string]: any}) {
    this.user = user;
    this.fullName = fullName;
    this.authorizations = auths;
  }

  // Validar si es SUPERUSER
  public isSuperUser():boolean {
    const auths = this.authorizations;

    if (!auths) return false;  // no existe auths
    // Chequear que tipo de dato es auths.role y validar por SUPERUSER
    if (auths.role && typeof auths.role === 'string') {
      return auths.role.indexOf('SUPERUSER') < 0 ? false : true;
    }
    if (auths.role && typeof auths.role === 'object') {
      return auths.role.includes('SUPERUSER');
    }
    return false; // cualquier otra cosa
  }

  // Validar que posea un cierto ROLE
  public hasRole(role: string):boolean {
    const auths = this.authorizations;

    if (!auths) return false;  // no existe auths
    // Chequear que tipo de dato es auths.role y validar el ROLE
    if (auths.role && typeof auths.role === 'string') {
      return auths.role.indexOf(role) < 0 ? false : true;
    }
    if (auths.role && typeof auths.role === 'object') {
      return auths.role.includes(role);
    }
    return false; // cualquier otra cosa
  }

};

