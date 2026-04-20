import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import truckRoutes from "./routes/truckRoutes.js";
import loadRoutes from "./routes/loadRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Truck and Load API is running" });
});

app.use("/api/trucks", truckRoutes);
app.use("/api/loads", loadRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});