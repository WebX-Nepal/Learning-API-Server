import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("video", schema);
