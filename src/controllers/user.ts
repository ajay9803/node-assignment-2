import { User } from "../interfaces/user";
import { users } from "../models/user";
import * as UserService from "../services/user";
import { Request, Response } from "express";

export const createNewUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  let newUser = {
    id: `${users.length + 1}`,
    name: name,
    email: email,
    password: password,
  };

  const result = await UserService.createUser(newUser);
  res.status(result.statusCode).send(result);
};

export const getUserById = (req: Request, res: Response) => {
  const { id } = req.params;
  const result = UserService.getUserById(id);

  res.status(result.statusCode).send(result);
};
