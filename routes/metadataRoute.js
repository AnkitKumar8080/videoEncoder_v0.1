import express from "express";
import { getMetadata } from "../controllers/getMetadata.js";
import authM from "../middleware/authM.js";
import { getQueueState } from "../controllers/queueState.js";
import { getResourceUsage } from "../controllers/getUsage.js";
import { sendEvent } from "../controllers/sse.js";
const router = express.Router();

router.route("/").get(authM, getMetadata);

router.route("/queuestatus").get(authM, getQueueState);

router.route("/resourceusage").get(authM, getResourceUsage);

// server-side-event route
router.route("/encprogcomp").get(sendEvent);
export default router;
