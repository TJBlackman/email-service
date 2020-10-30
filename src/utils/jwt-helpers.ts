// https://www.npmjs.com/package/jsonwebtoken
import jwt from 'jsonwebtoken';
import { IUser } from '../types';

const jwtOptions = {
  issuer: process.env.JWT_ISSUER,
  expiresIn: process.env.JWT_TIMEOUT
};

export const createUserJWT = (payload: Omit<IUser, 'password'>, options?: Partial<typeof jwtOptions>) =>
  new Promise((resolve, reject) => {
    const jwtValues = {
      email: payload.email,
      _id: payload._id,
      roles: payload.roles
    };
    jwt.sign(jwtValues, process.env.JWT_SECRET, { ...jwtOptions, ...options }, (err, token) => {
      if (err) {
        return reject(err);
      }
      resolve(token);
    });
  });

export const verifyUserJWT = (token: string): Promise<Omit<IUser, 'password'>> =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, jwtOptions, (err, value) => {
      if (err) {
        return reject(err);
      }
      resolve(value as Omit<IUser, 'password'>);
    });
  });

export const createJWT = (payload: object | string, options?: Partial<typeof jwtOptions>) => new Promise<string>((resolve, reject) => {
  jwt.sign(payload, process.env.JWT_SECRET, { ...jwtOptions, ...options }, (err, token) => {
    if (err) {
      return reject(err);
    }
    resolve(token);
  });
});
export const verifyJWT = <T>(token: string): Promise<T> =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, jwtOptions, (err, value) => {
      if (err) {
        return reject(err);
      }
      resolve(value as unknown as T);
    });
  });