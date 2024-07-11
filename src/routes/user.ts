import express from "express";
import { createNewUser, getUserById } from "../controllers/user";
import { authenticate } from "../middlewares/auth";

const router = express();

// create-user route to create new user
router.post("/create-user", createNewUser);

// get-user router to fetch user by id
// make use of authenticate middleware to authenticate user for accessing further contents
router.get("/get-userby-id/:id", authenticate, getUserById);

export default router;
