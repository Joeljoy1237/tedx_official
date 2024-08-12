import { Schema, model, models } from "mongoose";

const TicketSchema = new Schema({
  userId: {
    type: String,
    require: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  group: [
    {
      firstName: {
        type: String,
        require: true,
      },
      lastName: {
        type: String,
        require: true,
      },
      email: {
        type: String,
        require: true,
      },
      organisation: {
        type: String,
        require: true,
      },
    },
  ],
});

const Ticket = models.Ticket || model("Ticket", TicketSchema);
export default Ticket;
