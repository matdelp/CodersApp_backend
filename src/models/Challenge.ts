import { model, Schema } from "mongoose";

const DOCUMENT_NAME = "Challenge";
const COLLECTION_NAME = "challenge";

const schema = new Schema({
  title: {
    type: Schema.Types.String,
    required: true,
  },
  category: {
    type: Schema.Types.String,
    required: true,
  },
  description: {
    type: Schema.Types.String,
    required: true,
  },
  level: {
    type: Schema.Types.String,
    enum: ["Easy", "Moderate", "Hard"],
    required: true,
  },
  owner_id: {
    type: Schema.Types.String,
    required: true,
  },
  code: {
    type: [{ type: Schema.Types.ObjectId, ref: "Code" }],
    default: [],
    required: true,
  },
  tests: {
    type: [{ type: Schema.Types.ObjectId, ref: "Test" }],
    default: [],
    required: true,
  },
});

export const ChallengeModel = model(DOCUMENT_NAME, schema, COLLECTION_NAME);
