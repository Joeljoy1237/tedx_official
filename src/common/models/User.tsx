import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exist"],
    require: [true, "Email is required"],
  },
  password: {
    type: String,
    require: [true, "username is required"],
  },
});

const User = models.User || model("User", UserSchema);
export default User;
