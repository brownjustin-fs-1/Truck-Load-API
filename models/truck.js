import mongoose from "mongoose";

const truckSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true
    },
    truckNumber: {
      type: Number,
      required: [true, "Truck number is required"],
      min: [1, "Truck number must be at least 1"]
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true
    },
    lastServiceDate: {
      type: Date,
      required: [true, "Last service date is required"]
    }
  },
  {
    timestamps: true
  }
);

const Truck = mongoose.model("Truck", truckSchema);

export default Truck;