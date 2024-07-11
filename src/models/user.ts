import { User } from "../interfaces/user";

export const users: User[] = [];

// push new user to users-list
export const createUser = (user: User) => {
  users.push(user);
};

// fetch user by id
export const getUserById = (id: string) => {
  return users.find((user) => user.id === id);
};

// fetch user by email
export const getUserByEmail = (email: string) => {
  return users.find((user) => (user.email === email));
};
