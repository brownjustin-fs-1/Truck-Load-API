import mongoose from "mongoose";
import Truck from "../models/truck.js";
import Load from "../models/load.js";

// GET all trucks
export const getAllTrucks = async (req, res) => {
  try {
    const trucks = await Truck.find();
    res.status(200).json(trucks);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving trucks", error: error.message });
  }
};

// GET truck by ID
export const getTruckById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid truck ID" });
    }

    const truck = await Truck.findById(id);

    if (!truck) {
      return res.status(404).json({ message: "Truck not found" });
    }

    res.status(200).json(truck);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving truck", error: error.message });
  }
};

// POST create truck
export const createTruck = async (req, res) => {
  try {
    const newTruck = await Truck.create(req.body);
    res.status(201).json(newTruck);
  } catch (error) {
    res.status(400).json({ message: "Error creating truck", error: error.message });
  }
};

// PUT update truck by ID
export const updateTruck = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid truck ID" });
    }

    const updatedTruck = await Truck.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedTruck) {
      return res.status(404).json({ message: "Truck not found" });
    }

    res.status(200).json(updatedTruck);
  } catch (error) {
    res.status(400).json({ message: "Error updating truck", error: error.message });
  }
};

// DELETE truck by ID
export const deleteTruck = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid truck ID" });
    }

    const existingLoads = await Load.find({ truck: id });

    if (existingLoads.length > 0) {
      return res.status(400).json({
        message: "Cannot delete truck because it is assigned to one or more loads"
      });
    }

    const deletedTruck = await Truck.findByIdAndDelete(id);

    if (!deletedTruck) {
      return res.status(404).json({ message: "Truck not found" });
    }

    res.status(200).json({ message: "Truck deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting truck", error: error.message });
  }
};