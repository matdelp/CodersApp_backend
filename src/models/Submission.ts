import { model, Schema } from "mongoose";

export const DOCUMENT_NAME = "Submission";
const COLLECTION_NAME = "submission";

const schema = new Schema(
  {
    status: {
      type: Schema.Types.String,
      required: true,
    },
    lang: {
      type: Schema.Types.String,
      required: true,
    },
    code: {
      type: Schema.Types.String,
      required: true,
    },
    challenge_id: {
      type: Schema.Types.ObjectId,
      ref: "Challenge",
    },
    coder_id: {
      type: Schema.Types.ObjectId,
      ref: "Coder",
    },
  },
  { timestamps: true }
);
export const SubmissionModel = model(DOCUMENT_NAME, schema, COLLECTION_NAME);
