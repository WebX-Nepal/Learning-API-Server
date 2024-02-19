import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("aboutSection", schema);
