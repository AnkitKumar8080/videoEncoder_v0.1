import express from "express";
import { handleLogin, updateLoginPassword } from "../controllers/auth.js";
const router = express.Router();
router.route("/").post(handleLogin);
router.route("/").put(updateLoginPassword);

export default router;
