import queueRoutes from "./routes/queueRoutes.js";
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/queue", queueRoutes);

app.get("/", (req, res) => {
  res.send("🚀 QueueIt Backend Running");
});

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Backend Working Successfully!"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});