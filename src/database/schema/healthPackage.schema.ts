import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    order: {
      type: Number,
      required: true,
      unique: true,
    },

    totalRate: {
      type: Number,
      required: true,
    },

    packageRate: {
      type: Number,
      required: true,
    },

    item1: {
      type: String,
    },

    item2: {
      type: String,
    },

    item3: {
      type: String,
    },

    item4: {
      type: String,
    },

    item5: {
      type: String,
    },
    item6: {
      type: String,
    },
    item7: {
      type: String,
    },
    item8: {
      type: String,
    },
    item9: {
      type: String,
    },
    item10: {
      type: String,
    },
    item11: {
      type: String,
    },
    item12: {
      type: String,
    },
    item13: {
      type: String,
    },
    item14: {
      type: String,
    },
    item15: {
      type: String,
    },

    item16: {
      type: String,
    },

    item17: {
      type: String,
    },

    item18: {
      type: String,
    },

    item19: {
      type: String,
    },

    item20: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model("healthPackage", schema);
