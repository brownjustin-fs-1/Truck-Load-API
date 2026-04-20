import express from "express";
import {
  getAllLoads,
  getLoadById,
  createLoad,
  updateLoad,
  deleteLoad
} from "../controllers/loadController.js";

const router = express.Router();

router.get("/", getAllLoads);
router.get("/:id", getLoadById);
router.post("/", createLoad);
router.put("/:id", updateLoad);
router.delete("/:id", deleteLoad);

export default router;