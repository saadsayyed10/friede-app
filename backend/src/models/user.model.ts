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
    allergies: {
      type: String,
      required: false,
    },
    medicines: {
      type: String,
      required: false,
    },
    profilePictureUrl: {
      type: String,
      required: false,
    },
    prescriptionsUrl: {
      type: String,
      required: false,
    },
    prescriptions: {
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
