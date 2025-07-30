import dotenv from "dotenv";
import express from "express";
import "./database/db";
import { challengeRouter } from "./routes/challengeRoute";
import { coderRouter } from "./routes/codersRoute";
import { heatmapRouter } from "./routes/heatmapRoute";
import { leaderboardRouter } from "./routes/leaderboardRoute";
import { managerRouter } from "./routes/managerRoute";
import { solvedChallengesRouter } from "./routes/solvedChallengesRoute";
import { topKCodersRouter } from "./routes/topKCodersRoute";
import { trendingCategoriesRouter } from "./routes/trendingCategoriesRoute";
import { verifyEmailRouter } from "./routes/verifyEmailRoute";
import { envLoader } from "./envLoader";
envLoader(process.env.APP_ENV as "test" | "dev" | "prod" | null);

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/coders", coderRouter);
app.use("/managers", managerRouter);
app.use("/challenges", challengeRouter);
app.use("/leaderboard", leaderboardRouter);
app.use("/topkcoders", topKCodersRouter);
app.use("/solvedchallenges", solvedChallengesRouter);
app.use("/trendingcategories", trendingCategoriesRouter);
app.use("/heatmap", heatmapRouter);
app.use("/api", verifyEmailRouter);

app.get("/", (req, res) => {
  res.send("Hello world");
});

export default app;
