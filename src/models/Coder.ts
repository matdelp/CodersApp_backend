import { model, Schema } from "mongoose";
import { schemaProps as userSchemaProps } from "./User";

const DOCUMENT_NAME = "Coder";
const COLLECTION_NAME = "coder";

const schemaProps = {
  ...userSchemaProps,
  user_id: {
    type: Schema.Types.String,
    required: true,
  },
  description: {
    type: Schema.Types.String,
    required: false,
  },
  score: {
    type: Schema.Types.String,
    required: true,
  },
};
const schema = new Schema(schemaProps);

export const CoderModel = model(DOCUMENT_NAME, schema, COLLECTION_NAME);
