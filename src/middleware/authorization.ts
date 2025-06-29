import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type DecodedUser = {
  id: string;
  email: string;
};

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw new Error("Invalid Authorization");
    }
    if (!authorization.startsWith("Bearer")) {
      throw new Error("Invalid Authorization");
    }
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedUser;
    (req as any).user = decoded;
    next();
  } catch (error: any) {
    res.status(403).json({
      message: error?.message,
    });
  }
};
