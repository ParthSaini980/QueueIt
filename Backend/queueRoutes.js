import express from "express";
import { createQueue, joinQueue, getQueue, leaveQueue, serveNext } from "../controllers/queueController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
console.log("Queue routes loaded");

router.post("/create", authMiddleware, createQueue);

router.post("/join", authMiddleware, joinQueue);

router.post("/leave", authMiddleware, leaveQueue);

router.post("/serve", authMiddleware, serveNext);

router.get("/:queueId", getQueue);

export default router;