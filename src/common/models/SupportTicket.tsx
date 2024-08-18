import { Schema, model, models } from "mongoose";

const SupportTicketSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Replace 'User' with the name of your user model if different
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    mobNo: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    issue: {
      type: String,
      required: true,
      trim: true,
    },
    reply: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      enum: ["open", "in-progress", "resolved", "closed"],
      default: "open",
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
    updatedAt: {
      type: Date,
      default: () => new Date(),
    },
  },
  { timestamps: true }
);

const SupportTicket =
  models.SupportTicket || model("SupportTicket", SupportTicketSchema);
export default SupportTicket;
