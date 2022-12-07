import { Response } from "express";

// Error handler can be improved
export const errorHandler = (res: Response, error: any) => {
  return res.status(400).send({ message: error?.message });
};
