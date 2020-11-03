import { NextApiRequest, NextApiResponse } from 'next';
import OrganizationModel from "../../../../db/organizations.model";
import { connectToDB } from "../../../../db/connect";
import { requireUserCookieAuth } from "../../../../utils/cookie-helpers";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await requireUserCookieAuth(req, res);
    await connectToDB();
    const orgs = await OrganizationModel.find({ owner: user._id });
    res.json({
      success: true,
      data: orgs
    })
  }
  catch (err) {
    res.json({
      success: false,
      message: err.message
    })
  }
};