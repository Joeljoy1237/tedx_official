import { Schema, model, models } from "mongoose";

const BookingSchema = new Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
      rquire: true,
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
        ticketId: {
          type: String,
          require: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Booking = models.Booking || model("Booking", BookingSchema);
export default Booking;
