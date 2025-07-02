import express, { Router } from "express";
import { protect, restrictTo } from "../controllers/authController.js";
import {
	checkReviewEligibility,
	createReview,
	deleteReview,
	getAllReviews,
	getReview,
	updateReview,
	validateReviewEligibility,
} from "../controllers/reviewController.js";

const router = express.Router({ mergeParams: true });

router
	.route("/check-eligibility/:productId")
	.get(protect, restrictTo("user"), checkReviewEligibility);

router
	.route("/")
	.get(getAllReviews)
	.post(protect, restrictTo("user"), validateReviewEligibility, createReview);

router.use(protect);

router
	.route("/:id")
	.get(getReview)
	.patch(restrictTo("user"), updateReview)
	.delete(restrictTo("user", "admin"), deleteReview);

export default router;
