import { User } from "../interfaces/user";

export const users: User[] = [];

export const createUser = (user: User) => {
  users.push(user);
};

export const getUserById = (id: string) => {
  return users.find((user) => user.id === id);
};

export const getUserByEmail = (email: string) => {
  return users.find((user) => (user.email = email));
};
