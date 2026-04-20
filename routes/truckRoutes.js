import express from "express";
import {
  getAllTrucks,
  getTruckById,
  createTruck,
  updateTruck,
  deleteTruck
} from "../controllers/truckController.js";

const router = express.Router();

router.get("/", getAllTrucks);
router.get("/:id", getTruckById);
router.post("/", createTruck);
router.put("/:id", updateTruck);
router.delete("/:id", deleteTruck);

export default router;