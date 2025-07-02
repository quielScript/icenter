import CartItem from "../models/cartItemModel.js";
import AppError from "../utils/appError.js";
import { deleteCartItemById } from "../utils/cartHelpers.js";
import catchAsync from "../utils/catchAsync.js";

const addToCart = catchAsync(async (req, res, next) => {
	const { productId, quantity, color } = req.body;

	let cartItem = await CartItem.findOne({
		user: req.user.id,
		product: productId,
		color,
	});

	// Check if item already exists
	if (cartItem) {
		// If it exists, increment quantity
		cartItem.quantity += quantity;
		await cartItem.save();
	} else {
		// Create a new cart item
		cartItem = await CartItem.create({
			user: req.user.id,
			product: productId,
			quantity,
			color,
		});
	}

	res.status(201).json({
		status: "success",
		data: {
			cartItem,
		},
	});
});

const getCart = catchAsync(async (req, res, next) => {
	const cart = await CartItem.find({ user: req.user.id });

	res.status(200).json({
		status: "success",
		data: {
			cart,
		},
	});
});

const deleteCartItem = catchAsync(async (req, res, next) => {
	await deleteCartItemById(req.params.id);

	res.status(204).json({
		status: "success",
		data: null,
	});
});

const updateCartItem = catchAsync(async (req, res, next) => {
	const quantity = req.body.quantity;

	if (quantity < 1) {
		await deleteCartItemById(req.params.id);

		return res.status(204).json({
			status: "success",
			data: null,
		});
	}

	const updatedCartItem = await CartItem.findByIdAndUpdate(
		req.params.id,
		{ quantity },
		{ new: true, runValidators: true }
	);

	if (!updatedCartItem)
		return next(new AppError("No cart item found with that ID", 404));

	res.status(200).json({
		status: "success",
		data: {
			updatedCartItem,
		},
	});
});

export { addToCart, getCart, deleteCartItem, updateCartItem };
