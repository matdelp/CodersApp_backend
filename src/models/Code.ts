import { model, Schema } from "mongoose";

const DOCUMENT_NAME = "Code";
const COLLECTION_NAME = "code";

const schema = new Schema({
  function_name: {
    type: Schema.Types.String,
    required: true,
  },
  code_text: {
    type: [{ type: Schema.Types.ObjectId, ref: "CodeText" }],
  },
  inputs: {
    type: [{ type: Schema.Types.ObjectId, ref: "FunctionInputDefinition" }],
  },
});

export const CodeModel = model(DOCUMENT_NAME, schema, COLLECTION_NAME);
