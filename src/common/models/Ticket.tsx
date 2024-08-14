import { Schema, model, models } from "mongoose";

const TicketSchema = new Schema(
  {
    totalTicket: {
      type: Number,
      required: true,
    },
    ticketSold: {
      type: Number,
      require: true,
    },
    ticketRemaning: {
      type: Number,
      rquire: true,
    },
  },
  { timestamps: true }
);

const Ticket = models.Ticket || model("Booking", TicketSchema);
export default Ticket;
