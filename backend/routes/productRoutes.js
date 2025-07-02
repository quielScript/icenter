import express from "express";
import uploadMulter from "../middlewares/multer.js";
import {
	createProduct,
	getProduct,
	updateProduct,
	deleteProduct,
	getAllProducts,
} from "../controllers/productController.js";
import reviewRouter from "./reviewRoutes.js";

const router = express.Router();

router.use("/:productId/reviews", reviewRouter);

router
	.route("/")
	.get(getAllProducts)
	.post(
		uploadMulter.fields([
			{ name: "image1", maxCount: 1 },
			{ name: "image2", maxCount: 1 },
			{ name: "image3", maxCount: 1 },
		]),
		createProduct
	);

router.route("/:id").get(getProduct).patch(updateProduct).delete(deleteProduct);

export default router;
