import jwt, { JwtPayload } from 'jsonwebtoken';

const ACCESS_SECRET_KEY = process.env.JWT_ACCESS_SECRET_KEY as string;
const REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY as string;

export function generateAccessToken(payload: JwtPayload): string {
  return jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: "10m" });
}

export function generateRefreshToken(payload: JwtPayload): string {
  return jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: "7d" });
}