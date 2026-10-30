import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    allergies: [
      {
        allergy: { type: String, required: false },
        cause: { type: String, required: false },
        risk: {
          type: String,
          enum: ["Low", "Moderate", "High"],
          required: false,
        },
      },
    ],
    profilePictureUrl: {
      type: String,
      required: false,
    },
    quota: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
