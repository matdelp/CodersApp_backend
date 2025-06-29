import { model, Schema } from "mongoose";

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
});

export const CoderModel = model(DOCUMENT_NAME, schema, COLLECTION_NAME);
