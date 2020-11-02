import { NextApiRequest, NextApiResponse } from 'next';
import UserModel from "../../../../db/user.model";
import { connectToDB } from "../../../../db/connect";
import { IUser } from '../../../../types';
import { validateRegisterValues } from '../../../../utils/validation/user-register'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { error, value } = validateRegisterValues({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });
  if (error) {
    throw new Error(error.message);
  }
  await connectToDB();
  const existingUser = await UserModel.find({ email: value.email });
  if (existingUser.length > 0) {
    throw new Error('Email address is already in use.');
  }
  const user = new UserModel({
    firstName: value.firstName,
    lastName: value.lastName,
    email: value.email,
    password: value.password,
  });
  const newUser = await user.save();
  const userDocumentAsObject = newUser.toObject() as IUser;
  delete userDocumentAsObject.password;
  res.json({
    success: true,
    data: userDocumentAsObject
  });
};