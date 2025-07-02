import mongoose from "mongoose";
import Product from "../models/productModel.js";

const reviewSchema = new mongoose.Schema(
	{
		review: {
			type: String,
			required: [true, "Review cannot be empty!"],
		},
		rating: {
			type: Number,
			min: 1,
			max: 5,
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
		product: {
			type: mongoose.Schema.ObjectId,
			ref: "Product",
			required: [true, "Review must belong to a product."],
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: [true, "Review must belong to a user."],
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

reviewSchema.pre(/^find/, function (next) {
	this.populate({
		path: "user",
		select: "firstName lastName photo",
	});

	next();
});

reviewSchema.statics.calcAverageRating = async function (productId) {
	const stats = await this.aggregate([
		{
			$match: { product: productId },
		},
		{
			$group: {
				_id: "$product",
				numRating: { $sum: 1 },
				avgRating: { $avg: "$rating" },
			},
		},
	]);

	if (stats.length > 0) {
		await Product.findByIdAndUpdate(productId, {
			ratingsQuantity: stats[0].numRating,
			ratingsAverage: stats[0].avgRating,
		});
	} else {
		await Product.findByIdAndUpdate(productId, {
			ratingsQuantity: 0,
			ratingsAverage: 4.5,
		});
	}
};

reviewSchema.post("save", function () {
	// this - document
	// constructor - model
	this.constructor.calcAverageRating(this.product);
});

// Get document and store in this.review
reviewSchema.pre(/^findOneAnd/, async function (next) {
	this.review = await this.clone().findOne();

	next();
});

// Calc rating again when updated/deleted
reviewSchema.post(/^findOneAnd/, async function () {
	await this.review.constructor.calcAverageRating(this.review.product);
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
