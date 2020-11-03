// https://www.npmjs.com/package/jsonwebtoken
import jwt from 'jsonwebtoken';
import { IUser } from '../types';

const JWT_OPTIONS = {
  issuer: process.env.JWT_ISSUER,
  expiresIn: process.env.JWT_TIMEOUT
};

export type UserJWTPayload = {
  email: IUser['email'],
  _id: IUser['_id']
};

export const createUserJWT = (payload: UserJWTPayload) =>
  new Promise<string>((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_SECRET, JWT_OPTIONS, (err, token) => {
      if (err) {
        return reject(err);
      }
      resolve(token);
    });
  });

export const verifyUserJWT = (token: string): Promise<UserJWTPayload> =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, JWT_OPTIONS, (err, value) => {
      if (err) {
        return reject(err);
      }
      resolve(value as UserJWTPayload);
    });
  });

export const createJWT = (payload: object | string) => new Promise<string>((resolve, reject) => {
  jwt.sign(payload, process.env.JWT_SECRET, JWT_OPTIONS, (err, token) => {
    if (err) {
      return reject(err);
    }
    resolve(token);
  });
});

export const verifyJWT = <T>(token: string): Promise<T> =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, JWT_OPTIONS, (err, value) => {
      if (err) {
        return reject(err);
      }
      resolve(value as unknown as T);
    });
  });