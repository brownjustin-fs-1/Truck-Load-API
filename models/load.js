import mongoose from "mongoose";

const loadSchema = new mongoose.Schema(
  {
    pickupLocation: {
      type: String,
      required: [true, "Pickup location is required"],
      trim: true
    },
    deliveryLocation: {
      type: String,
      required: [true, "Delivery location is required"],
      trim: true
    },
    weight: {
      type: Number,
      required: [true, "Weight is required"],
      min: [1, "Weight must be greater than 0"]
    },
    hazmat: {
      type: Boolean,
      required: true,
      default: false
    },
    deliveryDate: {
      type: Date,
      required: [true, "Delivery date is required"]
    },
    truck: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Truck",
      required: [true, "Truck ID is required"]
    }
  },
  {
    timestamps: true
  }
);

const Load = mongoose.model("Load", loadSchema);

export default Load;