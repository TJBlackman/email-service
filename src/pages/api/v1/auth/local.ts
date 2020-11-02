import { NextApiRequest, NextApiResponse } from 'next'
import UserModel from "../../../../db/user.model";
import { connectToDB } from "../../../../db/connect";
import { compareHash } from '../../../../utils/password-helpers';
import { validateLoginValues } from "../../../../utils/validation/user-login";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { value, error } = validateLoginValues({
      email: req.body.email,
      password: req.body.password
    });
    if (error) {
      throw Error(error.message);
    }
    await connectToDB();
    const existingUsers = await UserModel.find({ email: value.email }).select('+password');
    if (existingUsers.length === 0) {
      throw new Error('Account not found.');
    }
    const isCorrectPw = await compareHash(req.body.password, existingUsers[0].password);
    if (isCorrectPw === false) {
      throw Error('Incorrect password.');
    }
    const user = existingUsers[0].toObject();
    delete user.password;
    res.json({
      success: true,
      data: user
    });
  }
  catch (err) {
    res.json({
      success: false,
      message: err.message
    })
  }
}