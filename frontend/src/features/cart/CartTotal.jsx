import { useSelector } from "react-redux";
import { getTotalCartAmount } from "./cartSlice";

function CartTotal() {
	const DELIVERY_FEE = 370;
	const totalCartAmount = useSelector(getTotalCartAmount);
	const totalAmount = totalCartAmount + DELIVERY_FEE;

	return (
		<div className="border border-heliotrope-gray px-5 text-xs sm:text-base">
			<div className="py-5 border-b border-heliotrope-gray flex items-center justify-between">
				<p className="font-bold">Subtotal</p>
				<p className="font-bold">₱{totalCartAmount.toLocaleString()}</p>
			</div>

			<div className="py-5 border-b border-heliotrope-gray flex items-center justify-between">
				<p>Delivery Charge</p>
				<p>₱{DELIVERY_FEE}</p>
			</div>

			<div className="py-5 flex items-center justify-between">
				<p className="font-bold">Grand Total</p>
				<p className="font-bold">₱{totalAmount.toLocaleString()}</p>
			</div>
		</div>
	);
}

export default CartTotal;
