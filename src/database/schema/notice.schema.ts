import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model("notice", schema);
