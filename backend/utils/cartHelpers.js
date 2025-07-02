import CartItem from "../models/cartItemModel.js";
import AppError from "./appError.js";

const deleteCartItemById = async (id) => {
	const cartItem = await CartItem.findByIdAndDelete(id);

	if (!cartItem) throw new AppError("No cart item found with that ID", 404);
};

export { deleteCartItemById };
