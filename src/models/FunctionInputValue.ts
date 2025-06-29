import { model, Schema } from "mongoose";

const DOCUMENT_NAME = "FunctionInputValue";
const COLLECTION_NAME = "functionInputValue";

const schema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  value: {
    type: Schema.Types.String,
    required: true,
  },
});

export const FunctionInputValueModel = model(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
