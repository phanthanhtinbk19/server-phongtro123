import express from "express";
import * as priceController from "../controllers/PriceController.js";

const router = express.Router();

router.get("/", priceController.getPrices);

export default router;
