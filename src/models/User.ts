import { model, Schema } from "mongoose";

const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "user";

export const schemaProps = {
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
};
const schema = new Schema(schemaProps);
export const UserModel = model(DOCUMENT_NAME, schema, COLLECTION_NAME);
