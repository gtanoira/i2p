"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuth = void 0;
class UserAuth {
    constructor(user, fullName, auths) {
        this.user = user;
        this.fullName = fullName;
        this.authorizations = auths;
    }
    isSuperUser() {
        const auths = this.authorizations;
        if (!auths)
            return false;
        if (auths.role && typeof auths.role === 'string') {
            return auths.role.indexOf('SUPERUSER') < 0 ? false : true;
        }
        if (auths.role && typeof auths.role === 'object') {
            return auths.role.includes('SUPERUSER');
        }
        return false;
    }
    hasRole(role) {
        const auths = this.authorizations;
        if (!auths)
            return false;
        if (auths.role && typeof auths.role === 'string') {
            return auths.role.indexOf(role) < 0 ? false : true;
        }
        if (auths.role && typeof auths.role === 'object') {
            return auths.role.includes(role);
        }
        return false;
    }
}
exports.UserAuth = UserAuth;
;
//# sourceMappingURL=user-auth.model.js.map