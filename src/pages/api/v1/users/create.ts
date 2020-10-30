import { NextApiRequest, NextApiResponse } from 'next';
import UserModel from "../../../../db/user.model";
import { connectToDB } from "../../../../db/connect";
import { IUser } from '../../../../types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body.email) {
    throw new Error('Missing required property: email');
  }
  if (!req.body.password) {
    throw new Error('Missing required property: password');
  }
  await connectToDB();
  const existingUser = await UserModel.find({ email: req.body.email });
  if (existingUser.length > 0) {
    throw new Error('Email address is already in use.');
  }
  const user = new UserModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });
  const newUser = await user.save();
  const userDocumentAsObject = newUser.toObject() as IUser;
  delete userDocumentAsObject.password;
  res.json({
    success: true,
    data: userDocumentAsObject
  });
};