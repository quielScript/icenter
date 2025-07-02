import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import CartItem from "../models/cartItemModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const placeOrder = catchAsync(async (req, res, next) => {
	const allowedPaymentMethods = ["cod"];
	const { paymentMethod } = req.body || "cod";

	if (!paymentMethod || !allowedPaymentMethods.includes(paymentMethod))
		return next(new AppError("Invalid or missing payment method", 400));

	const cartItems = await CartItem.find({ user: req.user.id });

	if (!cartItems.length) return next(new AppError("No items in cart", 400));

	// Transform cart items into order items
	const orderItems = cartItems.map((item) => ({
		product: item.product._id,
		productName: item.product.name,
		productImgCover: item.product.images[0],
		color: item.color,
		quantity: item.quantity,
		price: item.product.price,
	}));

	// Calculate total cart amount
	const totalAmount = cartItems.reduce(
		(acc, item) => acc + item.product.price * item.quantity,
		0
	);

	// Create order
	const orderData = {
		name: req.body.name,
		contactNumber: Number(req.body.contactNumber),
		address: req.body.address,
		zipCode: Number(req.body.zipCode),
		user: req.user.id,
		items: orderItems,
		totalAmount: totalAmount + req.body.deliveryFee,
		paymentMethod,
		status: paymentMethod === "cod" ? "placed" : "pending",
		isPaid: paymentMethod === "cod",
		paidAt: paymentMethod === "cod" ? Date.now() : undefined,
	};

	const order = await Order.create(orderData);

	// Delete user cart item/s
	await CartItem.deleteMany({ user: req.user.id });

	res.status(201).json({
		status: "success",
		data: {
			order,
		},
	});
});

const getOrder = catchAsync(async (req, res, next) => {
	const order = await Order.findById(req.params.id);

	res.status(200).json({
		status: "success",
		data: {
			order,
		},
	});
});

const getAllOrders = catchAsync(async (req, res, next) => {
	const filter = req.user.role === "user" ? { user: req.user.id } : {};
	const orders = await Order.find(filter);

	res.status(200).json({
		status: "success",
		results: orders.length,
		data: {
			orders,
		},
	});
});

const updateOrder = catchAsync(async (req, res, next) => {
	const order = await Order.findById(req.params.id);

	if (!order) return next(new AppError("No order found with that ID", 404));

	const prevStatus = order.status;
	const newStatus = req.body.status;

	// If status is being changed to delivered AND it hasn't already been delivered
	if (newStatus === "delivered" && prevStatus !== "delivered") {
		for (const item of order.items) {
			await Product.findByIdAndUpdate(item.product, {
				$inc: { sold: item.quantity },
			});
		}
	}

	// Update other fields from req.body
	Object.assign(order, req.body);

	await order.save({ validateBeforeSave: true });

	res.status(200).json({
		status: "success",
		data: {
			order,
		},
	});
});

const deleteOrder = catchAsync(async (req, res, next) => {
	const order = await Order.findByIdAndDelete(req.params.id);

	if (!order) return next(new AppError("No order found with that ID", 404));

	res.status(204).json({
		status: "success",
		data: null,
	});
});

export { placeOrder, getOrder, getAllOrders, updateOrder, deleteOrder };
