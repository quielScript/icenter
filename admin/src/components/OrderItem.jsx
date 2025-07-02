import {
	FaCheck,
	FaPenToSquare,
	FaRegTrashCan,
	FaXmark,
} from "react-icons/fa6";
import OrderItemInfo from "./OrderItemInfo";
import { formatDate } from "../utils/helper";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateOrder, deleteOrder } from "../services/apiOrder";
import { toast } from "react-toastify";

function OrderItem({ order, onOrderUpdate, onOrderDelete }) {
	const [orderStatus, setOrderStatus] = useState(order.status);
	const [isEditing, setIsEditing] = useState(false);
	const [name, setName] = useState(order.name);
	const [contactNumber, setContactNumber] = useState(order.contactNumber);
	const [address, setAddress] = useState(order.address);

	const { token } = useAuth();
	const user = order.user;
	const items = order.items;

	const handleSaveUpdate = async () => {
		if (!name || !contactNumber || !address) {
			return toast.error("All customer fields are required.");
		}

		try {
			const newData = { name, contactNumber, address };
			const data = await updateOrder(order._id, newData, token);
			const updatedOrder = data.data.order;

			if (data.status === "success") {
				onOrderUpdate(updatedOrder);
				toast.success("Customer info updated");
			}

			setIsEditing(false);
		} catch (err) {
			toast.error(err.message);
		}
	};

	const handleCancelUpdate = () => {
		setName(order.name);
		setContactNumber(order.contactNumber);
		setAddress(order.address);
		setIsEditing(false);
	};

	const handleStatusChange = async (e) => {
		const newStatus = e.target.value;
		setOrderStatus(newStatus);

		try {
			const data = await updateOrder(order._id, { status: newStatus }, token);
			const updatedOrder = data.data.order;

			if (data.status === "success") {
				onOrderUpdate(updatedOrder);
				toast.success("Order status updated");
			}
		} catch (err) {
			toast.error(err.message);
		}
	};

	const handleDeleteOrder = async () => {
		try {
			await deleteOrder(order._id, token);
			toast.success("Order deleted");
			onOrderDelete(order._id);
		} catch (err) {
			toast.error(err.message);
		}
	};

	return (
		<li className="border border-slate-300 p-2 grid grid-cols-4 gap-5">
			{/* Product info */}
			{items.map((item, i) => (
				<OrderItemInfo item={item} key={i} />
			))}

			{/* Order info */}
			<div>
				<p>
					<span className="font-bold">Order Date:</span>{" "}
					{formatDate(order.createdAt)}
				</p>
				<p className="capitalize">
					<span className="font-bold">Status:</span> {orderStatus}
				</p>
				<p className="capitalize">
					<span className="font-bold">Payment Status:</span>{" "}
					{order.isPaid ? "Paid" : "Pending"}
				</p>
				<p>
					<span className="font-bold">Payment Method:</span>{" "}
					{order.paymentMethod}
				</p>
				<p>
					<span className="font-bold">Order ID:</span> {order._id}
				</p>
			</div>

			{/* Customer info */}
			<div>
				<p>
					<span className="font-bold">Name:</span>{" "}
					{isEditing ? (
						<input
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="border px-2 py-1 rounded w-full"
						/>
					) : (
						order.name
					)}
				</p>
				<p>
					<span className="font-bold">Contact:</span>{" "}
					{isEditing ? (
						<input
							value={contactNumber}
							onChange={(e) => setContactNumber(e.target.value)}
							className="border px-2 py-1 rounded w-full"
						/>
					) : (
						order.contactNumber
					)}
				</p>
				<p>
					<span className="font-bold">Email:</span> {user.email}
				</p>
				<p>
					<span className="font-bold">Address:</span>{" "}
					{isEditing ? (
						<textarea
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							className="border px-2 py-1 rounded w-full"
						/>
					) : (
						order.address
					)}
				</p>

				{/* Save / Cancel */}
				{isEditing && (
					<div className="flex items-center gap-3 mt-3 text-xl">
						<button
							className="cursor-pointer text-green-600"
							title="Save"
							onClick={handleSaveUpdate}
						>
							<FaCheck />
						</button>
						<button
							className="cursor-pointer text-gray-500"
							title="Cancel"
							onClick={handleCancelUpdate}
						>
							<FaXmark />
						</button>
					</div>
				)}
			</div>

			{/* Actions */}
			<div>
				<div className="flex items-center gap-2 mb-5">
					<label htmlFor="status">Status</label>
					<select
						className="border border-slate-300"
						value={orderStatus}
						onChange={handleStatusChange}
					>
						<option value="placed">Placed</option>
						<option value="shipped">Shipped</option>
						<option value="out-for-delivery">Out for delivery</option>
						<option value="delivered">Delivered</option>
						<option value="canceled">Canceled</option>
					</select>
				</div>

				<div className="flex flex-col gap-5">
					<div className="flex items-center gap-2">
						<p>Edit Customer:</p>
						<button
							className="cursor-pointer text-green-500"
							onClick={() => setIsEditing(true)}
						>
							<FaPenToSquare className="text-xl" />
						</button>
					</div>

					<div className="flex items-center gap-2">
						<p>Delete:</p>
						<button
							className="cursor-pointer text-red-500"
							onClick={handleDeleteOrder}
						>
							<FaRegTrashCan className="text-xl" />
						</button>
					</div>
				</div>
			</div>
		</li>
	);
}

export default OrderItem;
