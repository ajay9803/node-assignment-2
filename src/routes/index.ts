import express from "express";

import todoRouter from "./todo";

// app - router
const router = express();

router.use("/todos", todoRouter);

export default router;
