import mongoose from "mongoose";
import Load from "../models/load.js";
import Truck from "../models/truck.js";

// GET all loads
export const getAllLoads = async (req, res) => {
  try {
    const loads = await Load.find().populate("truck");
    res.status(200).json(loads);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving loads", error: error.message });
  }
};

// GET load by ID
export const getLoadById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid load ID" });
    }

    const load = await Load.findById(id).populate("truck");

    if (!load) {
      return res.status(404).json({ message: "Load not found" });
    }

    res.status(200).json(load);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving load", error: error.message });
  }
};

// POST create load
export const createLoad = async (req, res) => {
  try {
    const { truck } = req.body;

    if (!mongoose.Types.ObjectId.isValid(truck)) {
      return res.status(400).json({ message: "Invalid truck ID" });
    }

    const truckExists = await Truck.findById(truck);

    if (!truckExists) {
      return res.status(404).json({ message: "Assigned truck not found" });
    }

    const newLoad = await Load.create(req.body);
    res.status(201).json(newLoad);
  } catch (error) {
    res.status(400).json({ message: "Error creating load", error: error.message });
  }
};

// PUT update load by ID
export const updateLoad = async (req, res) => {
  try {
    const { id } = req.params;
    const { truck } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid load ID" });
    }

    if (truck) {
      if (!mongoose.Types.ObjectId.isValid(truck)) {
        return res.status(400).json({ message: "Invalid truck ID" });
      }

      const truckExists = await Truck.findById(truck);

      if (!truckExists) {
        return res.status(404).json({ message: "Assigned truck not found" });
      }
    }

    const updatedLoad = await Load.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    }).populate("truck");

    if (!updatedLoad) {
      return res.status(404).json({ message: "Load not found" });
    }

    res.status(200).json(updatedLoad);
  } catch (error) {
    res.status(400).json({ message: "Error updating load", error: error.message });
  }
};

// DELETE load by ID
export const deleteLoad = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid load ID" });
    }

    const deletedLoad = await Load.findByIdAndDelete(id);

    if (!deletedLoad) {
      return res.status(404).json({ message: "Load not found" });
    }

    res.status(200).json({ message: "Load deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting load", error: error.message });
  }
};