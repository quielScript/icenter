import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
	product: {
		type: mongoose.Schema.ObjectId,
		ref: "Product",
		required: true,
	},
	productName: {
		type: String,
		required: true,
	},
	productImgCover: {
		type: String,
		required: true,
	},
	color: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
		default: 1,
	},
	price: {
		type: Number,
		required: true,
	},
});

const orderSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "An order should have a name"],
	},
	contactNumber: {
		type: Number,
		required: [true, "An order should have a contact number"],
	},
	address: {
		type: String,
		required: [true, "An order should have an address"],
	},
	zipCode: {
		type: Number,
		required: [true, "An order should have a zip code"],
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
		required: [true, "An order should belong to a user"],
	},
	items: [orderItemSchema],
	totalAmount: {
		type: Number,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	status: {
		type: String,
		enum: [
			"pending",
			"placed",
			"shipped",
			"out-for-delivery",
			"delivered",
			"canceled",
		],
		default: "pending",
	},
	paymentMethod: {
		type: String,
		enum: ["cod"],
		required: [true, "Payment method is required"],
	},
	isPaid: {
		type: Boolean,
		default: false,
	},
	paidAt: Date,
});

orderSchema.pre(/^find/, function (next) {
	this.populate({
		path: "items.product",
		select: "name price images slug",
	}).populate({
		path: "user",
		select: "name email",
	});
	next();
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
