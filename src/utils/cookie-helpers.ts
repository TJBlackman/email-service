import Cookies from 'cookies';
import { NextApiRequest, NextApiResponse } from 'next';
import { createUserJWT, verifyUserJWT, UserJWTPayload } from './jwt-helpers';

export const setUserAuthCookie = async (req: NextApiRequest, res: NextApiResponse, data: UserJWTPayload): Promise<boolean> => {
  const cookies = new Cookies(req, res);
  const jwt = await createUserJWT(data);
  const expireDate = (() => {
    const hours = parseInt(process.env.COOKIE_EXPIRE_IN_HOURS);
    const ms = 1000 * 60 * 60 * hours; // ms/s * s/min * min/hour * number hours
    const futureDate = Date.now() + ms;
    return new Date(futureDate);
  })();
  cookies.set(process.env.COOKIE_NAME, jwt, { httpOnly: true, expires: expireDate });
  return true;
};

export const requireUserCookieAuth = async (req: NextApiRequest, res: NextApiResponse): Promise<UserJWTPayload> => {
  const cookies = new Cookies(req, res);
  const jwt = cookies.get(process.env.COOKIE_NAME);
  if (!jwt) {
    throw new Error('Unauthorized.')
  }
  const user = await verifyUserJWT(jwt).catch();
  return {
    _id: user._id,
    email: user.email
  };
};

export const deleteUserCookie = async (req: NextApiRequest, res: NextApiResponse): Promise<boolean> => {
  const cookies = new Cookies(req, res);
  cookies.set(process.env.COOKIE_NAME, '', { httpOnly: true, expires: new Date("01/01/2020") });
  return true;
}