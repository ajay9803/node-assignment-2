import express from "express";

import config from "./config";

import router from "./routes";
import { genericErrorHandler } from "./middlewares/error_handler";
import { requestLogger } from "./middlewares/logger";

const app = express();

app.use(express.json());

app.use(requestLogger);

app.use(router);

// pass error handling middleware
app.use(genericErrorHandler);

// listen for connections on host/port
app.listen(config.port, () => {
  console.log(`Server started listening on port: ${config.port}`);
});
