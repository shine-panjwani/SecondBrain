import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/utils";
import { AuthReq } from "../types/types";
export function userAuth(req: AuthReq, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      msg: "Token not found",
    });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    req.id = data.id;
    if (!data) {
      return res.status(404).json({
        msg: "Not found",
      });
    } else {
      next();
    }
  } catch (error) {
    return res.status(403).json({ msg: "Invalid token" });
  }
}
