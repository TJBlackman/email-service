import { NextApiRequest, NextApiResponse } from "next";
import { deleteUserCookie } from "../../../../utils/cookie-helpers";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await deleteUserCookie(req, res);
    res.json({
      success: true
    });
  }
  catch (err) {
    res.json({
      success: false,
      message: err.message
    });
  }
} 