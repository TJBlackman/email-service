import { NextApiRequest, NextApiResponse } from 'next';
import OrganizationModel from "../../../../db/organizations.model";
import { connectToDB } from "../../../../db/connect";
import { IOrganization } from '../../../../types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.json({
    success: true,
    message: 'create an organization'
  })
};