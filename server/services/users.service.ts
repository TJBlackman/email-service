import { IUser } from "../../shared/types/user.ts";
import { writeNewUser } from "../DAL/users.dal.ts";


export const getUsers = () => `Here's some users`;

export const postNewUser = async (payload: Pick<IUser, 'email' | 'password'>) => {
  const x = await writeNewUser(payload);
  return x;
};

export const editUser = () => `Edit a user`;
export const deleteUser = () => `Delete a user`; 