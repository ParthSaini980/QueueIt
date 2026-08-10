import mongoose from "mongoose";

const queueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    createdBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},

    users: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
],

    status: {
      type: String,
      enum: ["active", "closed"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Queue = mongoose.model("Queue", queueSchema);

export default Queue;