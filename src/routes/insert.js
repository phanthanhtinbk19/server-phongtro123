import express from "express";
import * as inserController from "../controllers/InsertController";

const router = express.Router();
router.post("/", inserController.insert);

export default router;
