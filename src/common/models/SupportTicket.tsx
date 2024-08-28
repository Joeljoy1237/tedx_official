import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema({
  sender: {
    type: String, // "user" or "support"
    required: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  timestamp: {
    type: Date,
    default: () => new Date(),
  },
});

const SupportTicketSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
    messages: [MessageSchema], // Array of messages
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
