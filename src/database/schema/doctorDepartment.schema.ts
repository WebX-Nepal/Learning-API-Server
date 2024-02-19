import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    department: {
      type: Schema.Types.ObjectId,
      ref: "department",
    },

    doctor: {
      type: Schema.Types.ObjectId,
      ref: "doctor",
    },
  },
  {
    timestamps: true,
  }
);

export default model("doctorDepartment", schema);
