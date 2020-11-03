import { NextApiRequest, NextApiResponse } from 'next';
import OrganizationModel from "../../../../db/organizations.model";
import { connectToDB } from "../../../../db/connect";
import { IOrganization } from '../../../../types';
import { requireUserCookieAuth } from "../../../../utils/cookie-helpers";
import { validateCreateOrganizationValues } from "../../../../utils/validation/organization-create";
import { v4 as uuidv4 } from 'uuid';
import UserModel from '../../../../db/user.model';


export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { _id } = await requireUserCookieAuth(req, res);
    const user = await UserModel.findById(_id);
    const values = await validateCreateOrganizationValues(req.body);
    await connectToDB();
    const newOrg = new OrganizationModel({
      name: values.name,
      sendGridAPIKeys: values.sendGridAPIKeys,
      owner: user._id,
      apiKey: uuidv4()
    });
    const savedOrg = await newOrg.save();
    user.organizations.push(savedOrg._id);
    await user.save();
    res.json({
      success: true,
      data: savedOrg.toObject()
    })
  }
  catch (err) {
    res.json({
      success: false,
      message: err.message
    })
  }
};