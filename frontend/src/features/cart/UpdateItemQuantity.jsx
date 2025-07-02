import { FaMinus, FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../auth/authSlice";
import { deleteItemFromCart, updateCartItemQuantity } from "./cartSlice";

function UpdateItemQuantity({ item = {}, quantity, setQuantity, type }) {
	const token = useSelector(getToken);
	const dispatch = useDispatch();

	/**
	 * This function only runs if the type of the parent component is "cartItem"
	 * @param {number} newQuantity - new quantity of cart item
	 */
	const updateItem = (newQuantity) => {
		if (type === "cartItem" && newQuantity >= 1) {
			dispatch(
				updateCartItemQuantity({
					itemId: item.id,
					quantity: newQuantity,
					token,
				})
			);
		}
	};

	const handleChangeQuantity = (val) => {
		const newQuantity = quantity + val;

		if (type === "cartItem" && newQuantity < 1) {
			dispatch(deleteItemFromCart({ itemId: item.id, token }));
			return;
		}

		if (newQuantity < 1) return;

		setQuantity(newQuantity);
		updateItem(newQuantity);
	};

	const handleInputChange = (e) => {
		const value = e.target.value;

		if (value === "") {
			setQuantity("");
			return;
		}

		const val = Number(value);

		if (Number.isNaN(val)) return;

		if (val < 1) {
			if (type === "cartItem") {
				dispatch(deleteItemFromCart({ itemId: item.id, token }));
			}
			return;
		}

		setQuantity(val);
		updateItem(val);
	};

	return (
		<div className="flex border border-licorice-black gap-1 sm:gap-2 py-2 px-2 sm:px-4 rounded-md text-xs sm:text-base">
			<button onClick={() => handleChangeQuantity(-1)}>
				<FaMinus />
			</button>
			<input
				type="text"
				name="quantity"
				id="quantity"
				className="w-6 text-center"
				value={quantity}
				onChange={handleInputChange}
			/>
			<button onClick={() => handleChangeQuantity(1)}>
				<FaPlus />
			</button>
		</div>
	);
}

export default UpdateItemQuantity;
