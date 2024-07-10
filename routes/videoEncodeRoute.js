import express from "express";
import { encodeVideo } from "../controllers/encodeVideo.js";
import authM from "../middleware/authM.js";
import terminateEncodingProcess from "../controllers/terminateEncodingProcess.js";
const router = express.Router();
router.route("/").post(authM, encodeVideo);
router.route("/").delete(authM, terminateEncodingProcess);
export default router;
