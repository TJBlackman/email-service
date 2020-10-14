import { IUser } from "../../shared/types/user.ts";
import { db } from "./db.ts";

const UserCollection = db.collection<IUser>('users');

export const writeNewUser = async (payload: Pick<IUser, 'email' | 'password'>) => {
  const userWithDefaultRoles: Pick<IUser, 'email' | 'password' | 'roles'> = {
    ...payload,
    roles: ['user']
  };
  const userId = await UserCollection.insertOne(userWithDefaultRoles);
  const newUser = await UserCollection.findOne({ _id: { "$oid": userId["$oid"] } });
  return newUser;
}