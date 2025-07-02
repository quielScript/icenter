import cloudinary from "cloudinary";
import Product from "../models/productModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const createProduct = catchAsync(async function (req, res, next) {
	const {
		name,
		description,
		price,
		colors = [],
		category,
		specs = {},
		brand,
		stocks,
	} = req.body;

	let parsedColors = [];
	let parsedSpecs = {};

	try {
		parsedColors =
			typeof colors === "string"
				? JSON.parse(colors)
				: Array.isArray(colors)
				? colors
				: [];
	} catch {
		return next(new AppError("Invalid JSON in 'colors'", 400));
	}

	try {
		parsedSpecs =
			typeof specs === "string"
				? JSON.parse(specs)
				: typeof specs === "object"
				? specs
				: {};
	} catch {
		return next(new AppError("Invalid JSON in 'specs'", 400));
	}

	const image1 = req.files.image1?.[0];
	const image2 = req.files.image2?.[0];
	const image3 = req.files.image3?.[0];

	const images = [image1, image2, image3].filter(Boolean);

	const imagesUrl = await Promise.all(
		images.map(async (image) => {
			// Upload images to cloudinary
			const res = await cloudinary.uploader.upload(image.path, {
				resource_type: "image",
			});
			return res.secure_url;
		})
	);

	const productData = {
		name,
		description,
		price: Number(price),
		colors: parsedColors,
		images: imagesUrl,
		category,
		specs: parsedSpecs,
		brand,
		stocks,
	};

	const product = await Product.create(productData);

	res.status(201).json({
		status: "success",
		data: {
			product,
		},
	});
});

const getProduct = catchAsync(async function (req, res, next) {
	const product = await Product.findById(req.params.id);

	if (!product) return next(new AppError("No product found with that ID", 404));

	res.status(200).json({
		status: "success",
		data: {
			product,
		},
	});
});

const updateProduct = catchAsync(async function (req, res, next) {
	const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	if (!product) return next(new AppError("No product found with that ID", 404));

	res.status(200).json({
		status: "success",
		data: {
			product,
		},
	});
});

const deleteProduct = catchAsync(async function (req, res, next) {
	if (!req.params.id)
		return next(new AppError("No ID provided, deletion denied", 400));

	const product = await Product.findByIdAndDelete(req.params.id);

	if (!product) return next(new AppError("No product found with that ID", 404));

	res.status(204).json({
		status: "success",
		data: null,
	});
});

const getAllProducts = catchAsync(async function (req, res, next) {
	const products = await Product.find();

	res.status(200).json({
		status: "success",
		results: products.length,
		data: {
			products,
		},
	});
});

export {
	createProduct,
	getProduct,
	updateProduct,
	deleteProduct,
	getAllProducts,
};
