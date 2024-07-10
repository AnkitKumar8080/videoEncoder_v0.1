import express from "express";
import removeFromQueue from "../controllers/removeFromQueue.js";
import authM from "../middleware/authM.js";

const router = express.Router();

router.route("/:filename").delete(authM, removeFromQueue);

export default router;
