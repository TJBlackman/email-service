export type Roles = 'user' | 'support' | 'admin';

export interface IUser {
  _id: { $oid: string };
  email: string;
  password: string;
  roles: Roles[];
};