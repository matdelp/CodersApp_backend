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

  code: {
    type: [{ type: Schema.Types.ObjectId, ref: "Code" }],
    default: {},
  },
  tests: {
    type: [{ type: Schema.Types.ObjectId, ref: "Test" }],
    default: [],
  },
});

export const ChallengeModel = model(DOCUMENT_NAME, schema, COLLECTION_NAME);
