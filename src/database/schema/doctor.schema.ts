import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    sunday: {
      type: String,
    },

    monday: {
      type: String,
    },

    tuesday: {
      type: String,
    },

    wednesday: {
      type: String,
    },

    thursday: {
      type: String,
    },

    friday: {
      type: String,
    },

    saturday: {
      type: String,
    },

    onlineAppointment: {
      type: String,
    },

    availableWholeWeek: {
      type: String,
    },

    nmc: {
      type: Number,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("doctor", schema);
