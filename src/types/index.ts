import { Document } from 'mongoose';

//
// User Types
//
export interface IUserBase {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  organizations: [];
};
export interface IUser extends IUserBase {
  _id: string;
  __v: number;
}
export interface IUserDocument extends IUserBase, Document { };
export interface IUserJWT extends Pick<IUser, 'firstName' | 'lastName' | 'email' | '_id'> { };

//
// Oranization Types
//
export interface IOrganizationBase {
  name: string;
  apiKey: string;
  sendGridAPIKeys: string[];
  owner: IUser['_id'];
}
export interface IOrganization extends IOrganizationBase {
  _id: string;
  __v: number;
}
export interface IOrganizationDocument extends IOrganizationBase, Document { };