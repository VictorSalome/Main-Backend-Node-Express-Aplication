import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  email: string;
  // add other properties as needed
  iat?: number;
  exp?: number;
}

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token não fornecido" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const secret = process.env.JWT_SECRET || "seu_jwt_secret";
    const decoded = jwt.verify(token, secret) as JwtPayload;
    (req as Request & { user: JwtPayload }).user = decoded;
    next();
  } catch (error) {
    console.error("Erro ao verificar o token:", error);
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
};
