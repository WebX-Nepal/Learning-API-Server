import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("faqImage", schema);
