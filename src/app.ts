import "./database/db";
import { envLoader } from "./envLoader";
import { createYoga } from "graphql-yoga";
import { createSchema } from "graphql-yoga";
import { createServer } from "node:http";
import { ChallengeModel } from "./models/Challenge";
import mongoose from "mongoose";

envLoader(process.env.APP_ENV as "test" | "dev" | "prod" | null);

const yoga = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Query {
        hello: String
        challenges: [Challenge]
      }
      type Challenge {
        title: String
        level: String
        description: String
      }
    `,
    resolvers: {
      Query: {
        hello: () => "Hello world",
        challenges: async () => {
          const challenges = await ChallengeModel.find();
          return challenges;
        },
      },
    },
  }),
  graphqlEndpoint: "/graphql",
});

const server = createServer(yoga);

// Wait for mongoose connection before listening
mongoose.connection.once("open", () => {
  console.log("MongoDB connected, starting server...");
  server.listen(3001, () => {
    console.log("GraphQL Yoga server running at http://localhost:3001/graphql");
  });
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
