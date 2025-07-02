import Order from "../models/orderModel.js";
import catchAsync from "../utils/catchAsync.js";
import Review from "../models/reviewModel.js";
import AppError from "../utils/appError.js";

const getAllReviews = catchAsync(async (req, res, next) => {
	const filter = req.params.productId ? { product: req.params.productId } : {};
	const reviews = await Review.find(filter);

	res.status(200).json({
		status: "success",
		results: reviews.length,
		data: {
			reviews,
		},
	});
});

const getReview = catchAsync(async (req, res, next) => {
	const review = await Review.findById(req.params.id);

	if (!review) return next(new AppError("No review found with that ID", 404));

	res.status(200).json({
		status: "success",
		data: {
			review,
		},
	});
});

const createReview = catchAsync(async (req, res, next) => {
	const { review, rating } = req.body;

	const newReview = await Review.create({
		review,
		rating,
		product: req.params.productId,
		user: req.user.id,
	});

	await newReview.populate({
		path: "user",
		select: "firstName lastName photo",
	});

	res.status(201).json({
		status: "success",
		data: {
			newReview,
		},
	});
});

const deleteReview = catchAsync(async (req, res, next) => {
	const review = await Review.findByIdAndDelete(req.params.id);

	if (!review) return next(new AppError("No review found with that ID", 404));

	res.status(204).json({
		status: "success",
		data: null,
	});
});

const updateReview = catchAsync(async (req, res, next) => {
	const updatedReview = await Review.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);

	if (!updatedReview)
		return next(new AppError("No review found with that ID", 404));

	res.status(200).json({
		status: "success",
		data: {
			updatedReview,
		},
	});
});

const isUserEligibleToReview = async (userId, productId) => {
	const existingReview = await Review.findOne({
		user: userId,
		product: productId,
	});

	if (existingReview) {
		return {
			eligible: false,
			message: "You have already reviewed this product.",
			statusCode: 400,
		};
	}

	const hasDeliveredOrder = await Order.findOne({
		user: userId,
		status: "delivered",
		"items.product": productId,
	});

	if (!hasDeliveredOrder) {
		return {
			eligible: false,
			message: "You can only review products you've ordered and received.",
			statusCode: 403,
		};
	}

	return {
		eligible: true,
		message: "User is eligible to review this product.",
	};
};

const checkReviewEligibility = catchAsync(async (req, res, next) => {
	const userId = req.user.id;
	const productId = req.params.productId;

	const result = await isUserEligibleToReview(userId, productId);

	return res.status(200).json({
		status: "success",
		eligible: result.eligible,
		message: result.message,
	});
});

const validateReviewEligibility = catchAsync(async (req, res, next) => {
	const userId = req.user.id;
	const productId = req.params.productId || req.body.product;

	const result = await isUserEligibleToReview(userId, productId);

	if (!result.eligible) {
		return next(new AppError(result.message, result.statusCode));
	}

	next();
});

export {
	getAllReviews,
	getReview,
	createReview,
	deleteReview,
	updateReview,
	validateReviewEligibility,
	checkReviewEligibility,
};
