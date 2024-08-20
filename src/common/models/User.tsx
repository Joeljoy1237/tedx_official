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
      type: String,
      require: [true, "Mobile Number is required"],
    },
    organisation: {
      type: String,
      required: [true, "Organisation is required"],
    },
    referal_code: {
      type: String,
      default: "",
    },
    referals: [
      {
        type: String,
        default: [],
      },
    ],
    wallet: {
      type: Number,
      default: 0,
    },
    designation: {
      type: String,
      require: true,
    },
    isBought: {
      type: Boolean,
      default: false,
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
      default: false,
    },
    resetLockUntil: {
      type: Date,
      require: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;
