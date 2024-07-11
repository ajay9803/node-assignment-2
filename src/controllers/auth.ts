import { Request, Response } from "express";
import * as AuthService from "../services/auth";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await AuthService.login(email, password);
  res.status(result.statusCode).json(result);
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.json({ message: "No token provided" });
  }

  const result = await AuthService.refreshAccessToken(authorization);
  res.status(result.statusCode).json(result);
};
