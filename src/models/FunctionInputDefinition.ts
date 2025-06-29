import { model, Schema } from "mongoose";

const DOCUMENT_NAME = "FunctionInputDefinition";
const COLLECTION_NAME = "functionInputDefinition";

const schema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  type: {
    type: Schema.Types.String,
    required: true,
  },
});

export const functionInputDefinitionModel = model(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
