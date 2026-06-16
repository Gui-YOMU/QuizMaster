import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const ACCESS_SECRET_KEY = process.env.JWT_ACCESS_SECRET_KEY as string;

export function authToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access_token requis" });
  }

  try {
    const decoded = jwt.verify(token, ACCESS_SECRET_KEY) as JwtPayload;
    req.headers["x-user-id"] = decoded.id;
    req.headers["x-user-role"] = decoded.role;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Token expiré" });
      }
      return res.status(403).json({ error: "Token invalide" });
    }
  }

