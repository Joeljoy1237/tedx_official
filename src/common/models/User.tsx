import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      require: [true, "Fist Naame is required"],
    },
    lastName: {
      type: String,
      require: [true, "Last Name is reqired"],
    },
    email: {
      type: String,
      unique: [true, "Email already exist"],
      require: [true, "Email is required"],
    },
    mobile: {
      type: Number,
      require: [true, "Mobile Number is required"],
    },
    organisation: {
      type: String,
      required: [true, "Organisation is required"],
    },
    referal_code: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: [true, "Password is required"],
    },
    resetTokenUsed: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    resetCount: {
      type: Number,
      default: 0,
    },
    tokenUsed: {
      type: Boolean,
      default: false, // Set this to false initially
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;
