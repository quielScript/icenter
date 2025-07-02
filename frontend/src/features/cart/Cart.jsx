import { useEffect } from "react";
import Button from "../../ui/Button";
import SectionHeader from "../../ui/SectionHeader";
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../auth/authSlice";
import { deleteItemFromCart, getCartItems, getUserCart } from "./cartSlice";

function Cart() {
	const token = useSelector(getToken);
	const dispatch = useDispatch();
	const cart = useSelector(getCartItems);

	useEffect(() => {
		if (token) dispatch(getUserCart(token));
	}, [token, dispatch]);

	const handleDeleteItem = (item) => {
		dispatch(deleteItemFromCart({ itemId: item.id, token }));
	};

	return (
		<div className="max-w-7xl xl:mx-auto mx-10 pt-6 md:pt-16 pb-14 md:pb-24">
			<SectionHeader text1="your" text2="cart" />

			<div className="grid md:grid-cols-[2fr_1fr] gap-10 items-start">
				{/* Right and */}
				{!cart || cart.length < 1 ? (
					<p>There&apos;s nothing here...</p>
				) : (
					<div>
						<ul className="divide-y divide-heliotrope-gray">
							{cart.map((item) => (
								<CartItem
									item={item}
									key={item.id}
									onDeleteItem={handleDeleteItem}
								/>
							))}
						</ul>
					</div>
				)}

				{/* Left hand */}
				{cart.length > 0 && (
					<div className="space-y-5">
						<CartTotal />

						<Button btnType="link" to="/order/new" full={true}>
							Proceed to Checkout
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}

export default Cart;
