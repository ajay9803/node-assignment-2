import config from "../config";
import { InvalidError } from "../error/invalid_error";
import { NotFoundError } from "../error/not_found_error";
import { UnauthenticatedError } from "../error/unauthenticated_error";
import { getUserByEmail } from "./user";
import bcrypt from "bcrypt";
import { verify, sign } from "jsonwebtoken";

export const login = async (email: string, password: string) => {
  // fetch existing user by email
  const existingUser = getUserByEmail(email);

  // throw error when the user data is null
  if (!existingUser) {
    const error = new NotFoundError("No user found with associated email.");
    throw error;
  }

  // check for password validation
  const isValidPassword = await bcrypt.compare(password, existingUser.password);

  // throw error on invalid password
  if (!isValidPassword) {
    const error = new UnauthenticatedError("Invalid email or password.");
    throw error;
  }

  // create a payload
  const payload = {
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
  };

  // create access token
  const accessToken = sign(payload, config.jwt_secret!, {
    expiresIn: config.accesstoken_expiry,
  });

  // create refresh token
  const refreshToken = sign(payload, config.jwt_secret!, {
    expiresIn: config.refreshtoken_expiry,
  });

  // return success message
  return {
    statusCode: 200,
    message: "User login successful.",
    user: existingUser,
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

export const refreshAccessToken = (refreshToken: string) => {
  try {
    // split the token on empty spacing
    const token = refreshToken.split(" ");

    // check if the bearer token is provided
    if (token.length !== 2 || token[0] !== "Bearer") {
      // throw error if token isn't provided
      const error = new NotFoundError("No Bearer token provided.");
      throw error;
    }

    let bearerToken = token[1];

    // get data by verifying the token
    const decodedToken = verify(bearerToken, config.jwt_secret!) as {
      id: string;
      name: string;
      email: string;
    };

    if (!decodedToken) {
      // throw error if token is null
      const error = new UnauthenticatedError("Invalid token provided.");
      throw error;
    }

    // create a payload from verified token
    const payload = {
      id: decodedToken.id,
      name: decodedToken.name,
      email: decodedToken.email,
    };

    // create new access token
    const accessToken = sign(payload, config.jwt_secret!, {
      expiresIn: config.accesstoken_expiry,
    });

    // return success message
    return { statusCode: 200, accessToken: accessToken };
  } catch (e) {
    throw new InvalidError("Jwt token is expired.");
  }
};
