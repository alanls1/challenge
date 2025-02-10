import express, { Request, Response } from "express";

import wordsList from "./wordList/routes";
import cors from "cors";

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use("/wordsList", wordsList);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
