import { users } from "../models/user";
import * as UserService from "../services/user";
import { NextFunction, Request, Response } from "express";

// controller to create new user
export const createNewUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  let newUser = {
    id: `${users.length + 1}`,
    name: name,
    email: email,
    password: password,
  };

  const result = await UserService.createUser(newUser);
  // send success message
  res.status(result.statusCode).send(result);
};

// controller to fetch user by id
export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = UserService.getUserById(id);

    // send success message
    res.status(result.statusCode).send(result);
  } catch (e) {
    // send error to generic error handler
    next(e);
  }
};
