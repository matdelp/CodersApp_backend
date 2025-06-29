import { model, Schema } from "mongoose";

const DOCUMENT_NAME = "Manager";
const COLLECTION_NAME = "manager";

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
  challenges: {
    type: [{ type: Schema.Types.ObjectId, ref: "Challenge" }],
  },
  status: {
    type: Schema.Types.String,
    enum: ["verified", "unverified"],
    required: true,
  },
});

export const ManagerModel = model(DOCUMENT_NAME, schema, COLLECTION_NAME);
