import { Submission } from "../data";

export type Challenge = {
  title: string;
  category: string;
  description: string;
  level: "Easy" | "Moderate" | "Hard";
  code: Code[];
  test: Test[];
  submission: Submission[];
};
