import dotenv from "dotenv";
import express from "express";
import { challengeRouter } from "./routes/challengeRoute";
import { coderRouter } from "./routes/codersRoute";
import { managerRouter } from "./routes/managerRoute";
import { submissionRouter } from "./routes/submissionRoute";
import { leaderboardRouter } from "./routes/leaderboardRoute";
import { topKCodersRouter } from "./routes/topKCodersRoute";
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/coders", coderRouter);
app.use("/managers", managerRouter);
app.use("/challenges", challengeRouter);
app.use("/submit", submissionRouter);
app.use("/leaderboard", leaderboardRouter);
app.use("/topkcoders", topKCodersRouter);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Server is running on: http://localhost:${port}/`);
});
