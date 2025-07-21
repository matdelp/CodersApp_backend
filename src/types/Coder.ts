import { Submission } from "./Submission";

export type Coder = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  description: string;
  score: number;
  is_verified: boolean;
  submission: Submission[];
};
