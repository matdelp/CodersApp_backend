import { createSchema, createYoga } from "graphql-yoga";
import mongoose from "mongoose";
import { createServer } from "node:http";
import "./database/db";
import { envLoader } from "./envLoader";
import { ChallengeModel } from "./models/Challenge";
import "./models/Submission";
import "./models/Code";
import "./models/CodeText";
import "./models/FunctionInputDefinition";
import "./models/FunctionInputValue";
import "./models/Test";

envLoader(process.env.APP_ENV as "test" | "dev" | "prod" | null);

const yoga = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Query {
        hello: String
        challenges(category: String): [Challenge]
        categories: [Category!]
        oneChallenge(id: ID!): Challenge
      }
      type Challenge {
        title: String
        level: String
        description: String
        category: String
        code: Code
        test: [Test]
        submission: [Submission]
      }
      type Category {
        name: String!
        count: Int!
      }
      type Code {
        function_name: String
        code_text: [CodeText]
        inputs: [FunctionInputDefinition]
      }
      type CodeText {
        language: String
        content: String
      }
      type FunctionInputDefinition {
        name: String
        type: String
      }
      type Test {
        weight: Int
        inputs: [FunctionInputValue]
        outputs: String
      }
      type FunctionInputValue {
        name: String
        value: String
      }
      type Submission {
        status: String!
      }
    `,
    resolvers: {
      Query: {
        hello: () => "Hello world",
        challenges: async (_parent, args) => {
          const { category } = args;
          const filter = category ? { category } : {};
          const challenges = await ChallengeModel.find(filter).populate({
            path: "submission",
            select: "status",
          });
          return challenges;
        },
        categories: async () => {
          const allCategories = await ChallengeModel.distinct("category");
          const categoriesWithCount = await Promise.all(
            allCategories.map(async (name) => {
              const count = await ChallengeModel.countDocuments({
                category: name,
              });
              return { name, count };
            })
          );

          return categoriesWithCount;
        },
        oneChallenge: async (_parent, args) => {
          const { id } = args;
          const challenge = await ChallengeModel.findById(id).populate([
            {
              path: "code",
              populate: [{ path: "code_text" }, { path: "inputs" }],
            },
            {
              path: "test",
              populate: { path: "inputs" },
            },
            {
              path: "submission",
            },
          ]);
          return challenge;
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
  server.listen(3000, () => {
    console.log("GraphQL Yoga server running at http://localhost:3000/graphql");
  });
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
