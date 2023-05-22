import express from "express";
import * as UserController from "../controllers/UserController.js";
import {verifyToken} from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/get-current", verifyToken, UserController.getCurrent);
router.put("/update-profile", verifyToken, UserController.updateUser);

export default router;
