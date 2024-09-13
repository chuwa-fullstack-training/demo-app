import { Schema, model } from "mongoose";

const ProfileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    company: {
      type: String,
    },
    location: {
      type: String,
    },
    status: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    githubUsername: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model("Profile", ProfileSchema);
