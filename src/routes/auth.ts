import express from "express";
import { login, refreshAccessToken } from "../controllers/auth";

const router = express();

router.post("/login", login);
router.post("/refresh-access-token", refreshAccessToken);

export default router;
