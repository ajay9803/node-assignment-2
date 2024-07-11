import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import config from "../config";
import { UnauthenticatedError } from "../error/unauthenticated_error";

// authentication middleware - for verifying / authenticating user
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get authorization - headers
  const { authorization } = req.headers;

  // throw unauthenticated error - when header not found
  if (!authorization) {
    next(new UnauthenticatedError("Authorization header not found"));
    return;
  }

  // throw unauthenticated error - bearer token not provided
  const token = authorization?.split(" ");
  if (token?.length !== 2 || token[0] !== "Bearer") {
    next(new UnauthenticatedError("No bearer token provided."));
    return;
  }

  // verify token
  const isValidToken = verify(token[1], config.jwt_secret!);

  // throw unauthenticated error - token data invalid
  if (!isValidToken) {
    next(new UnauthenticatedError());
  }
  next();
};
