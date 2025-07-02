import { FaRegTrashCan } from "react-icons/fa6";
import UpdateItemQuantity from "./UpdateItemQuantity";
import { useState } from "react";

function CartItem({ item, onDeleteItem }) {
	const [quantity, setQuantity] = useState(item.quantity);

	return (
		<li className="grid grid-cols-[1fr_auto] items-center gap-3 md:gap-6 py-3 md:py-6 border-b border-heliotrope-gray text-xs sm:text-base">
			<div className="flex items-center gap-4">
				<img
					src={item.product.images[0]}
					alt=""
					className="w-10 h-10 sm:w-16 sm:h-16 object-cover"
				/>

				<div className="flex flex-col gap-2">
					<p className="font-semibold">{item.product.name}</p>
					<p className="text-gray-500">Color: {item.color}</p>
				</div>
			</div>

			<div className="flex items-center gap-2 md:gap-4">
				<p className="text-xs sm:text-base">
					₱{item.totalPrice.toLocaleString()}
				</p>

				<UpdateItemQuantity
					item={item}
					quantity={quantity}
					setQuantity={setQuantity}
					type="cartItem"
				/>

				<button onClick={() => onDeleteItem(item)}>
					<FaRegTrashCan className="text-red-500" />
				</button>
			</div>
		</li>
	);
}

export default CartItem;
