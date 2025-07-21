import { Types } from "mongoose";

export type Submission = {
  status: string;
  lang: string;
  code: string;
  challenge_id: Types.ObjectId[];
  coder_id: Types.ObjectId[];
  timestamps: Date;
};

export type SubmissionPassedWithChallengeLevel = {
  status: string;
  challenge_id: ChallengeIdPopAndSelected;
}[];

type ChallengeIdPopAndSelected = {
  level: "Easy" | "Moderate" | "Hard";
  _id: Types.ObjectId;
};
