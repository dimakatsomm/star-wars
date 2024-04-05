import { Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleError = (res: Response, e: any) => {
  const sanitisedError = {
    message: e.data?.message || e.message || 'An unexpected error occurred',
    errorCode: e.errorCode || '',
  };

  return res.status(e.statusCode || e.status || 500).json({ status: false, data: sanitisedError });
};
