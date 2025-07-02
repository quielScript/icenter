import express from "express";
import { protect, restrictTo } from "../controllers/authController.js";
import {
	deleteOrder,
	getAllOrders,
	getOrder,
	placeOrder,
	updateOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.use(protect);

router
	.route("/")
	.get(restrictTo("admin", "user"), getAllOrders)
	.post(restrictTo("user"), placeOrder);

router
	.route("/:id")
	.get(restrictTo("user", "admin"), getOrder)
	.patch(restrictTo("admin"), updateOrder)
	.delete(restrictTo("admin"), deleteOrder);

export default router;
