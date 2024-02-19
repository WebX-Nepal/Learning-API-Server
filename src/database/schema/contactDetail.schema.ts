import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    emergencyHotline: {
      type: String,
      required: true,
    },

    emergencyAmbulanceHotline: {
      type: String,
      required: true,
    },

    hospitalNumber: {
      type: String,
      required: true,
    },

    heliRescueNumber: {
      type: String,
      required: true,
    },

    appointmentNumber: {
      type: String,
      required: true,
    },

    administrationNumber: {
      type: String,
      required: true,
    },

    twentyfourHourAvailableNumber: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("contactDetail", schema);
