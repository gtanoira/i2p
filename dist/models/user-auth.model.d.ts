export declare class UserAuth {
    user: string;
    fullName: string;
    authorizations?: {
        [key: string]: any;
    };
    constructor(user: string, fullName: string, auths?: {
        [key: string]: any;
    });
    isSuperUser(): boolean;
}
