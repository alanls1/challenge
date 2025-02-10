import express from "express";

import * as controller from "./controller";

const app = express();

app.get("/", controller.words);

export default app;
