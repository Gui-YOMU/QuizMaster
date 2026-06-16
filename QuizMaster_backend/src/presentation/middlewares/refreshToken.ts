import { Request, Response } from "express";
import jwt, {JwtPayload} from 'jsonwebtoken';
import { prisma } from "../../core/infrastructure/database/prisma.js";

const ACCESS_SECRET_KEY = process.env.JWT_ACCESS_SECRET_KEY as string;
const REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY as string;

export async function refreshToken(req: Request, res: Response) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ error: "Aucun refresh token trouvé" });
  }

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET_KEY) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: { id: true, role: true },
    });

    if (!user) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }
    const newAccessToken = jwt.sign(
      { id: user.id, role: user.role },
      ACCESS_SECRET_KEY,
      { expiresIn: "10m" },
    );
    const newRefreshToken = jwt.sign(
      { id: user.id },
      REFRESH_SECRET_KEY,
      { expiresIn: "7d" }
    )
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
    });
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ error: "Refresh token invalide" });
  }
}
