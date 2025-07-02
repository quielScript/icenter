import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
	{
		quantity: {
			type: Number,
			required: true,
			default: 1,
		},
		product: {
			type: mongoose.Schema.ObjectId,
			ref: "Product",
			required: [true, "A cart item must belong to a product"],
		},
		color: {
			type: String,
			require: [true, "A cart item must have a color"],
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: [true, "A cart item must belong to a user"],
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

cartItemSchema.pre(/^find/, function (next) {
	this.populate("product");
	next();
});

cartItemSchema.virtual("totalPrice").get(function () {
	if (this.product?.price && this.quantity) {
		return this.product.price * this.quantity;
	}

	return 0;
});

const CartItem = mongoose.model("CartItem", cartItemSchema);

export default CartItem;
