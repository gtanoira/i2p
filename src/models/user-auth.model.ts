export class UserAuth {
  user: string;
  fullName: string;
  authorizations?: {[key:string]: any};

  constructor(user: string, fullName: string, auths?: {[key:string]: any}) {
    this.user = user;
    this.fullName = fullName;
    this.authorizations = auths;
  }

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
};

