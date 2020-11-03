import { NextApiRequest, NextApiResponse } from 'next';
import { requireUserCookieAuth } from "../../../../utils/cookie-helpers";
import UserModel from "../../../../db/user.model";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { _id } = await requireUserCookieAuth(req, res);
    const user = await UserModel.findById(_id);
    res.json({
      success: true,
      data: user
    })

  }
  catch (err) {
    res.json({
      success: false,
      message: err.message
    });
  }
}