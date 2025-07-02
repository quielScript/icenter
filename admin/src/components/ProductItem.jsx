import {
	FaCheck,
	FaPenToSquare,
	FaRegTrashCan,
	FaXmark,
} from "react-icons/fa6";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { deleteProduct, updateProduct } from "../services/apiProducts";
import { useState } from "react";

function ProductItem({ product, onProductUpdate }) {
	const [isEditing, setIsEditing] = useState(false);
	const [price, setPrice] = useState(product.price.toString());
	const [stock, setStock] = useState(product.stocks.toString());
	const { token } = useAuth();

	const handleDeleteProduct = async () => {
		try {
			await deleteProduct(product.id, token);
			toast.success("Product deleted");
		} catch (err) {
			toast.error(err.message);
		}
	};

	const handleSaveUpdateProduct = async () => {
		if (!price || !stock)
			return toast.error("Please fill the product information!");

		const newData = {
			price: Number(price),
			stocks: Number(stock),
		};

		try {
			const data = await updateProduct(product.id, newData, token);
			const updatedProduct = data.data.product;

			if (data.status === "success") {
				onProductUpdate(updatedProduct);
				toast.success("Product updated");
			}

			setIsEditing(false);
		} catch (err) {
			toast.error(err.message);
		}
	};

	const handleCancelUpdate = () => {
		setIsEditing(false);
		setPrice(product.price);
		setStock(product.stocks);
	};

	return (
		<li className="border border-slate-300 p-2 grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center">
			<img
				src={product.images[0]}
				alt=""
				className="w-15 h-15 border border-slate-300"
			/>

			<p className="font-semibold capitalize">{product.name}</p>

			<p className="font-semibold capitalize">{product.category}</p>

			{/* Editable Stocks */}
			{isEditing ? (
				<input
					type="number"
					value={stock}
					onChange={(e) => setStock(e.target.value)}
					className="border rounded px-2 py-1 w-20"
					min="1"
				/>
			) : (
				<p className="font-semibold">{product.stocks}</p>
			)}

			{/* Editable Price */}
			{isEditing ? (
				<input
					type="number"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					className="border rounded px-2 py-1 w-24"
					min="1"
				/>
			) : (
				<p className="font-semibold">₱{product.price.toLocaleString()}</p>
			)}

			{/* Action Buttons */}
			<div className="text-xl flex items-center gap-3">
				{isEditing ? (
					<>
						<button
							className="cursor-pointer text-green-600"
							onClick={handleSaveUpdateProduct}
							title="Save"
						>
							<FaCheck />
						</button>
						<button
							className="cursor-pointer text-gray-500"
							onClick={handleCancelUpdate}
							title="Cancel"
						>
							<FaXmark />
						</button>
					</>
				) : (
					<>
						<button
							className="cursor-pointer text-green-500"
							onClick={() => setIsEditing(true)}
							title="Edit"
						>
							<FaPenToSquare />
						</button>
						<button
							className="cursor-pointer text-red-500"
							onClick={handleDeleteProduct}
							title="Delete"
						>
							<FaRegTrashCan />
						</button>
					</>
				)}
			</div>
		</li>
	);
}

export default ProductItem;
