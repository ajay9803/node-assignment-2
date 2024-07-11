import express from "express";
import { login, refreshAccessToken } from "../controllers/auth";

const router = express();

// login route to generate tokens
router.post("/login", login);

// refresh token route - to regenerate access token
router.post("/refresh-access-token", refreshAccessToken);

export default router;
