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
        challenges(category: String): [Challenge]
        categories: [String]
        oneChallenge(id: ID!): Challenge
      }
      type Challenge {
        title: String
        level: String
        description: String
        category: String
      }
    `,
    resolvers: {
      Query: {
        hello: () => "Hello world",
        challenges: async (_parent, args) => {
          const { category } = args;
          const filter = category ? { category } : {};
          const challenges = await ChallengeModel.find(filter);
          return challenges;
        },
        categories: async () => {
          const categories = await ChallengeModel.distinct("category");
          return categories;
        },
        oneChallenge: async (_parent, args) => {
          const { id } = args;
          return await ChallengeModel.findById(id);
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
  server.listen(3003, () => {
    console.log("GraphQL Yoga server running at http://localhost:3003/graphql");
  });
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
