import { NextApiRequest, NextApiResponse } from 'next';
import cookies from 'cookies';
import OrganizationModel from "../../../../db/organizations.model";
import { connectToDB } from "../../../../db/connect";
import { IOrganization } from '../../../../types';
import Cookies from 'cookies';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.json({
    success: true,
    message: 'GET an organization'
  })
};