import express from "express";
import {
  createNewUser,
  getUserById,
} from "../controllers/user";

const router = express();

router.post("/create-user", createNewUser);
router.get("/get-userby-id/:id", getUserById);

export default router;
