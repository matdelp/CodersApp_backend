import { model, Schema } from "mongoose";
import { schemaProps as userSchemaProps } from "./User";

const DOCUMENT_NAME = "Manager";
const COLLECTION_NAME = "manager";

const schemaProps = {
  ...userSchemaProps,
  user_id: {
    type: Schema.Types.String,
    required: true,
  },
};
const schema = new Schema(schemaProps);

export const ManagerModel = model(DOCUMENT_NAME, schema, COLLECTION_NAME);