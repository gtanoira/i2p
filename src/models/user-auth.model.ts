export interface UserAuth {
  user: string;
  fullName: string;
  authorizations?: {[key:string]: any};
};
