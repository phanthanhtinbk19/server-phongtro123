import express from "express";
import * as areaController from "../controllers/AreaController.js";

const router = express.Router();

router.get("/", areaController.getAreas);

export default router;
