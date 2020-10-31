import { NextApiRequest, NextApiResponse } from 'next';
import createOrganizations from "./create";
import getOrganizations from "./get";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case 'GET': {
        await getOrganizations(req, res);
        return;
      }
      case 'POST': {
        await createOrganizations(req, res);
        return;
      }
    }
  }
  catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}