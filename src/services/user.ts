import { User } from "../interfaces/user";
import * as UserModel from "../models/user";
import bcrypt from "bcrypt";

export const createUser = async (user: User) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = {
    ...user,
    password: hashedPassword,
  };

  UserModel.createUser(newUser);
  return {
    statusCode: 201,
    message: "User created successfully",
    user: newUser,
  };
};

export const getUserById = (id: string) => {
  const data = UserModel.getUserById(id);

  if (data) {
    return {
      statusCode: 200,
      message: "User fetched successfully.",
      user: data,
    };
  } else {
    return {
      statusCode: 404,
      message: "User not found.",
    };
  }
};

export const getUserByEmail = (email: string) => {
  const data = UserModel.getUserByEmail(email);

  return data;
};
