import { model, Schema } from "mongoose";

const DOCUMENT_NAME = "TestCase";
const COLLECTION_NAME = "testCase";

const schema = new Schema({
  challenge_id: {
    type: Schema.Types.String,
    required: true,
  },
  weight: {
    type: Schema.Types.Number,
    required: true,
  },
  inputs: {
    type: [{ type: Schema.Types.ObjectId, ref: "functionInputValue" }],
    required: true,
  },
  output: {
    type: Schema.Types.String,
    required: true,
  },
});

export const TestModel = model(DOCUMENT_NAME, schema, COLLECTION_NAME);
