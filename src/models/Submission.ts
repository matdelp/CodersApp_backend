import { model, Schema } from "mongoose";

const DOCUMENT_NAME = "Submission";
const COLLECTION_NAME = "submission";

const schema = new Schema(
  {
    challenge_id: {
      type: Schema.Types.String,
      required: true,
    },
    codeText_id: {
      type: Schema.Types.String,
      required: true,
    },
    coder_id: {
      type: Schema.Types.String,
      required: true,
    },
    status: {
      type: Schema.Types.String,
      required: true,
    },
  },
  { timestamps: true }
);
export const SubmissionModel = model(DOCUMENT_NAME, schema, COLLECTION_NAME);
