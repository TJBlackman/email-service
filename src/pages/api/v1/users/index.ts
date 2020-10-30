import { create } from 'domain';
import { NextApiRequest, NextApiResponse } from 'next';
import createUser from './create';
import editUser from './edit';
import deleteUser from './delete';
import getUsers from './get';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case 'GET': {
        await getUsers(req, res);
        return;
      }
      case 'POST': {
        await createUser(req, res);
        return;
      }
      case 'PUT': {
        await editUser(req, res);
        return;
      }
      case 'DELETE': {
        await deleteUser(req, res);
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