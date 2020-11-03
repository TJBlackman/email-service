import { NextApiRequest, NextApiResponse } from "next";
import { requireUserCookieAuth, setUserAuthCookie, deleteUserCookie } from "../../../../utils/cookie-helpers";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await requireUserCookieAuth(req, res);
    await setUserAuthCookie(req, res, user);
    res.json({
      success: true
    });
  }
  catch (err) {
    console.log(err)
    await deleteUserCookie(req, res);
    res.status(401).end();
  }
}