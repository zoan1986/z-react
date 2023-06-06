import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { DataStoredInToken } from "@module/auth";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("z-auth-token");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied." });
  }
  try {
    const user = jwt.verify(
      token,
      process.env.JWT_TOKEN_SECRET!
    ) as DataStoredInToken;
    if (!req.user) req.user = { id: "" };

    req.user.id = user.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default authMiddleware;
