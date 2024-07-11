import { NotFoundError } from "../error/not_found_error";
import { User } from "../interfaces/user";
import * as UserModel from "../models/user";
import bcrypt from "bcrypt";

// create new user
export const createUser = async (user: User) => {
  // hash the password - to store hashed password to the users data
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = {
    ...user,
    password: hashedPassword,
  };

  UserModel.createUser(newUser);

  // return success-message 
  return {
    statusCode: 201,
    message: "User created successfully",
    user: newUser,
  };
};

// get user by id
export const getUserById = (id: string) => {
  const data = UserModel.getUserById(id);

  // return success-message
  if (data) {
    return {
      statusCode: 200,
      message: "User fetched successfully.",
      user: data,
    };
  } else {
    // throw user-user-not-found error 
    const error = new NotFoundError("User not found.");
    throw error;
  }
};

// fetch user by email
export const getUserByEmail = (email: string) => {
  const data = UserModel.getUserByEmail(email);

  // return user data: null / real data 
  return data;
};
