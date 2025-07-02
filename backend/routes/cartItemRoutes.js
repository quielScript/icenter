import express from "express";
import {
	addToCart,
	deleteCartItem,
	getCart,
	updateCartItem,
} from "../controllers/cartItemController.js";
import { protect, restrictTo } from "../controllers/authController.js";

const router = express.Router();

router.use(protect);
router.use(restrictTo("user"));

router.route("/").get(getCart).post(addToCart);

router.route("/:id").patch(updateCartItem).delete(deleteCartItem);

export default router;
