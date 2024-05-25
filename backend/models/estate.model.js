import mongoose from "mongoose";
const { Schema } = mongoose;

const EstateSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    totalStars: {
      type: Number,
      default: 0,
    },
    starNumber: {
      type: Number,
      default: 0,
    },
    cat: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: false,
    },
    userId: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    shortDesc: {
      type: String,
      required: true,
    },
    bedroomsNumber: {
      type: Number,
      required: true,
    },
    bathroom: {
      type: Number,
      required: true,
    },
    features: {
      type: [String],
      required: false,
    },
    tenent: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Estate", EstateSchema);
