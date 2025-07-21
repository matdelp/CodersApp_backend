import { Submission } from "../data";
import { Code } from "./Code";
import { Test } from "./Test";

export type Challenge = {
  title: string;
  category: string;
  description: string;
  level: "Easy" | "Moderate" | "Hard";
  code: Code[];
  test: Test[];
  submission: Submission[];
};
