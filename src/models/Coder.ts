import { model, Schema } from "mongoose";
import { submissions } from "../seedData";

const DOCUMENT_NAME = "Coder";
const COLLECTION_NAME = "coder";

export const schema = new Schema({
  firstName: {
    type: Schema.Types.String,
    required: true,
  },
  lastName: {
    type: Schema.Types.String,
    required: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  avatar: {
    type: Schema.Types.String,
    required: false,
  },
  description: {
    type: Schema.Types.String,
    required: false,
  },
  score: {
    type: Schema.Types.String,
    required: true,
  },
  is_verified: {
    type: Schema.Types.Boolean,
    required: true,
  },
  submission: {
    type: [{ type: Schema.Types.ObjectId, ref: "Submission" }],
    default: [],
  },
});

export const CoderModel = model(DOCUMENT_NAME, schema, COLLECTION_NAME);
