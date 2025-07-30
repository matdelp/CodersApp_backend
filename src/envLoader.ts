import { configDotenv } from "dotenv";

export const envLoader = (env: "test" | "dev" | "prod" | null) => {
  switch (env) {
    case "test":
      // Load test env file
      return configDotenv({
        path: ".env.test",
      });
    case "dev":
      // Load dev env file
      return configDotenv({
        path: ".env.dev",
      });
    case "prod":
      // Load prod env file
      return configDotenv({
        path: ".env",
      });
    default:
      // Load dev env file
      return configDotenv({
        path: ".env.dev",
      });
  }
};
