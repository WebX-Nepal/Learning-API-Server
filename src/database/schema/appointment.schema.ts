import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "doctor",
    },

    day: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    fullName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    resolve: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model("appointment", schema);
