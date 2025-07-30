import dotenv from "dotenv";
import mongoose from "mongoose";
import "../models/Challenge";
import { seed } from "./seed";
import { envLoader } from "../envLoader";
envLoader(process.env.APP_ENV as "test" | "dev" | "prod" | null);

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("No database defined");

const connection = mongoose.connect(uri);
connection
  .then(() => {
    console.log("Initialization complete");
  })
  .catch((error) => {
    console.log("Something went wrong with the initialization");
    console.log(error.message);
  });

mongoose.connection.on("connected", async () => {
  console.log("Mongoose default connection open");
  // TODO: uncomment when finish testing
  // await mongoose.connection.db?.dropDatabase();
  // await seed();
});

mongoose.connection.on("error", (error) => {
  console.log("Mongoose default connection error: " + error.message);
});

mongoose.connection.on("disconnected", (error) => {
  console.log("Mongoose default connection disconnected");
});
