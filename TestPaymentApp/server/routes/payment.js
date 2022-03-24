import express from "express";
import { getPayment, createPayment } from "../controllers/payment.js"

const router = express.Router();

router.get('/search', getPayment);
router.post('/', createPayment);

export default router;