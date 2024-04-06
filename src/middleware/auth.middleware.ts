import { NextFunction, Request, Response } from 'express';

import { decodeToken, validateTokenPresence } from '../utils/auth.util';
import { handleError } from '../utils/error.util';

export const validateUserSession = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = (req.headers['Authorization'] || req.headers['authorization'] || '') as string;
    if (!authHeader) {
      res.status(403).json({ status: false, data: { message: `No user token provided. Access denied.` } });
    }

    const token = authHeader.split(' ')[1] || '';
    validateTokenPresence(token);
    const decodedToken = decodeToken(token);

    req.auth = { userId: decodedToken.userId };

    next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    handleError(res, e);
  }
};
