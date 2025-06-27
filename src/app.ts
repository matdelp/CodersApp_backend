import express from "express";
import dotenv from "dotenv";
import { coderRouter } from "./routes/codersRoute";
import { managerRouter } from "./routes/managerRoute";
import { challengeRouter } from "./routes/challengeRoute";
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/coders", coderRouter);
app.use("/managers", managerRouter);
app.use("/challenge", challengeRouter)

app.listen(port, () => {
  console.log(`Server is running on: http://localhost:${port}/`);
});
