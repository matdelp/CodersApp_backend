import { model, Schema } from "mongoose";

const DOCUMENT_NAME = "Test";
const COLLECTION_NAME = "test";

const schema = new Schema({
  weight: {
    type: Schema.Types.Number,
    required: true,
  },
  inputs: {
    type: [{ type: Schema.Types.ObjectId, ref: "FunctionInputValue" }],
    required: true,
  },
  outputs: {
    type: Schema.Types.String,
    required: true,
  },
});

export const TestModel = model(DOCUMENT_NAME, schema, COLLECTION_NAME);
