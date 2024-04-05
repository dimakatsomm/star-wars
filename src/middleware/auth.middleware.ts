import { NextFunction, Request, Response } from 'express';

import { decodeToken, validateTokenPresence } from '../utils/auth.util';
import { handleError } from '../utils/error.util';

export const validateUserSession = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = (req.headers['Authorization'] as string).split(' ')[1] || '';
    validateTokenPresence(token);
    const decodedToken = decodeToken(token);

    req.auth = { userId: decodedToken.userId };

    next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    handleError(res, e);
  }
};
