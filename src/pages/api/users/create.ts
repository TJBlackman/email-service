import { NextApiRequest, NextApiResponse } from 'next';
import UserModel from "../../../db/users/user.model";
import { connectToDB } from "../../../db/connect";
import { createHash } from '../../../utils/password-helpers';

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
    throw new Error('Email address is already in use.')
  }
  const hashPw = await createHash(req.body.password);
  const user = new UserModel({
    email: req.body.email,
    password: hashPw
  });
  const newUser = await user.save();
  const userDocumentAsObject = newUser.toObject();
  delete userDocumentAsObject.password;
  res.json({
    success: true,
    data: userDocumentAsObject
  });
}