import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "A product must have a name."],
			trim: true,
		},
		slug: String,
		description: {
			type: String,
			required: [true, "A product must have a description"],
			trim: true,
		},
		price: {
			type: Number,
			required: [true, "A product must have a price"],
		},
		colors: {
			type: [String],
			default: [],
		},
		images: [String],
		category: String,
		specs: {
			type: Object,
			required: [true, "A product must have specifications"],
			default: {},
		},
		ratingsQuantity: {
			type: Number,
			default: 0,
		},
		ratingsAverage: {
			type: Number,
			default: 4.5,
			min: [1, "Rating must be above 1.0"],
			max: [5, "Rating must be below 5.0"],
			// Round rating before saving
			set: (curVal) => Math.round(curVal * 10) / 10,
		},
		sold: {
			type: Number,
			default: 0,
		},
		stocks: {
			type: Number,
			default: 10,
		},
		brand: {
			type: String,
			default: "Apple",
		},
		bestSeller: {
			type: Boolean,
			default: false,
		},
	},
	{ minimize: false, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// DOCUMENT MIDDLEWARE: runs before(pre) or after(post) .save() and .create()
productSchema.pre("save", function (next) {
	this.slug = slugify(this.name, { lower: true });
	next();
});

// Mark as best seller
productSchema.virtual("bestseller").get(function () {
	return this.sold > 50;
});

const Product = mongoose.model("Product", productSchema);

export default Product;
