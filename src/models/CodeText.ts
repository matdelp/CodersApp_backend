import { model, Schema } from "mongoose";

const DOCUMENT_NAME = "CodeText";
const COLLECTION_NAME = "codeText";

const schema = new Schema({
  language: {
    type: Schema.Types.String,
    required: true,
  },
  content: {
    type: Schema.Types.String,
    required: true,
  },
});

export const CodeTextModel = model(DOCUMENT_NAME, schema, COLLECTION_NAME);
