import { useState } from "react";
import Button from "../../ui/Button";
import SectionHeader from "../../ui/SectionHeader";
import CartTotal from "../cart/CartTotal";
import { toast } from "react-toastify";
import { checkout } from "../../services/apiOrder";
import { useSelector } from "react-redux";
import { getToken } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserCart } from "../cart/cartSlice";
import { getUser } from "../user/userSlice";
import { useEffect } from "react";

function PlaceOrder({ queryClient }) {
	const [name, setName] = useState("");
	const [contactNumber, setContactNumber] = useState("");
	const [address, setAddress] = useState("");
	const [zipCode, setZipCode] = useState("");
	const token = useSelector(getToken);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { firstName, lastName } = useSelector(getUser);

	useEffect(() => {
		setName(`${firstName} ${lastName}`);
	}, [firstName, lastName]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await checkout(
				name,
				Number(contactNumber),
				address,
				Number(zipCode),
				token
			);

			await queryClient.invalidateQueries({ queryKey: ["userOrders"] });

			dispatch(getUserCart(token));
			navigate("/orders");
		} catch (err) {
			toast.error(err.message);
		}
	};

	return (
		<div className="max-w-7xl xl:mx-auto mx-10 pt-6 md:pt-16 pb-14 md:pb-24">
			<SectionHeader text1="delivery" text2="information" />

			<form
				className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-10 items-start"
				onSubmit={handleSubmit}
			>
				{/* Left hand */}
				<div className="space-y-5 text-xs sm:text-base">
					<div className="flex flex-col gap-1">
						<label htmlFor="name">Name</label>
						<input
							type="text"
							name="name"
							id="name"
							placeholder="Name"
							required
							className="border border-licorice-black rounded-md py-2 px-4"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label htmlFor="contactNumber">Contact Number</label>
						<input
							type="number"
							name="contactNumber"
							id="contactNumber"
							placeholder="Contact Number"
							required
							className="border border-licorice-black rounded-md py-2 px-4"
							value={contactNumber}
							onChange={(e) => setContactNumber(e.target.value)}
						/>
					</div>

					<div className="grid grid-cols-2 gap-5">
						<div className="flex flex-col gap-1">
							<label htmlFor="address">Address</label>
							<input
								type="text"
								name="address"
								id="address"
								placeholder="Address"
								required
								className="border border-licorice-black rounded-md py-2 px-4"
								value={address}
								onChange={(e) => setAddress(e.target.value)}
							/>
						</div>
						<div className="flex flex-col gap-1">
							<label htmlFor="zipCode">Zip Code</label>
							<input
								type="number"
								name="zipCode"
								id="zipCode"
								placeholder="Zip Code"
								required
								className="border border-licorice-black rounded-md py-2 px-4"
								value={zipCode}
								onChange={(e) => setZipCode(e.target.value)}
							/>
						</div>
					</div>
				</div>

				{/* Right hand */}
				<div className="space-y-5">
					<CartTotal />

					<Button btnType="button" full={true}>
						Place Order
					</Button>
				</div>
			</form>
		</div>
	);
}

export default PlaceOrder;
