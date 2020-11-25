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

