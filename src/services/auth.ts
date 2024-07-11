import config from "../config";
import { getUserByEmail } from "./user";
import bcrypt from "bcrypt";
import { verify, sign } from "jsonwebtoken";

export const login = async (email: string, password: string) => {
  const existingUser = getUserByEmail(email);

  if (!existingUser) {
    return {
      statusCode: 404,
      message: `No user found with associated email.`,
    };
  }

  const isValidPassword = await bcrypt.compare(password, existingUser.password);

  if (!isValidPassword) {
    return {
      statusCode: 401,
      message: "Invalid email or password.",
    };
  }

  const payload = {
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
  };

  const accessToken = await sign(payload, config.jwt_secret!, {
    expiresIn: config.accesstoken_expiry,
  });

  const refreshToken = await sign(payload, config.jwt_secret!, {
    expiresIn: config.refreshtoken_expiry,
  });

  return {
    statusCode: 200,
    message: "User login successful.",
    user: existingUser,
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

export const refreshAccessToken = async (refreshToken: string) => {
  const token = refreshToken.split(" ");
  console.log(token);

  if (token.length !== 2 || token[0] !== "Bearer") {
    return {statusCode: 401, message: "No Bearer token provided." };
  }

  let bearerToken = token[1];

  try {
    const decodedToken = verify(bearerToken, config.jwt_secret!) as {
      id: string;
      name: string;
      email: string;
    };

    if (!decodedToken) {
      return {statusCode: 401, message: "Invalid token provided." };
    }

    const payload = {
      id: decodedToken.id,
      name: decodedToken.name,
      email: decodedToken.email,
    } ;

    const accessToken = await sign(payload, config.jwt_secret!, {
      expiresIn: config.accesstoken_expiry,
    });

    return {statusCode: 200, accessToken: accessToken };
  } catch (error) {
    return {
        statusCode: 500,
        message: 'Internal server error',
    };
  }
};
