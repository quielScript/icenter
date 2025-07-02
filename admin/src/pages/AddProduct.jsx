import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { addProduct } from "../services/apiProducts";

function AddProduct() {
	const [images, setImages] = useState([null, null, null]);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [specs, setSpecs] = useState([{ key: "", value: "" }]);
	const [colors, setColors] = useState([""]);
	const [stocks, setStocks] = useState("");
	const [brand, setBrand] = useState("apple");
	const [category, setCategory] = useState("mac");
	const [isLoading, setIsLoading] = useState(false);
	const { token } = useAuth();

	const allowedProductCategories = [
		"mac",
		"iphone",
		"ipad",
		"watch",
		"audio",
		"accessory",
	];

	const handleImageChange = (e, index) => {
		const file = e.target.files[0];
		if (!file) return;

		const updatedImages = [...images];
		updatedImages[index] = file;
		setImages(updatedImages);
	};

	const handleSpecChange = (index, field, value) => {
		const updatedSpecs = [...specs];
		updatedSpecs[index][field] = value;
		setSpecs(updatedSpecs);
	};

	const addSpecField = () => {
		setSpecs([...specs, { key: "", value: "" }]);
	};

	const removeSpecField = (index) => {
		const updated = [...specs];
		updated.splice(index, 1);
		setSpecs(updated);
	};

	const handleColorChange = (index, value) => {
		const updated = [...colors];
		updated[index] = value;
		setColors(updated);
	};

	const addColorField = () => {
		setColors([...colors, ""]);
	};

	const removeColorField = (index) => {
		const updated = [...colors];
		updated.splice(index, 1);
		setColors(updated);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const formData = new FormData();

			const formattedSpecs = specs.reduce((acc, { key, value }) => {
				if (!key.trim() || !value.trim()) return acc;

				// If user wants to input arrays via comma
				const isArray = value.includes(",") && !value.includes(":");
				acc[key.toLowerCase()] = isArray
					? value.split(",").map((v) => v.trim())
					: value;

				return acc;
			}, {});

			const filteredColors = colors
				.map((color) => color.trim())
				.filter((color) => color.length > 0);

			if (
				!name ||
				!description ||
				!price ||
				!stocks ||
				images.every((image) => !image)
			) {
				return toast.error(
					"Please fill in all required fields including images."
				);
			}

			formData.append("name", name);
			formData.append("description", description);
			formData.append("price", price);
			formData.append("stocks", stocks);
			formData.append("category", category);
			formData.append("brand", brand);

			formData.append("colors", JSON.stringify(filteredColors));
			formData.append("specs", JSON.stringify(formattedSpecs));

			// Append images to match backend field names
			images.forEach((img, i) => {
				if (img) formData.append(`image${i + 1}`, img);
			});

			const res = await addProduct(formData, token);

			if (res.status === "success") {
				toast.success("New Product Added!");
				setImages([null, null, null]);
				setName("");
				setDescription("");
				setPrice("");
				setSpecs([{ key: "", value: "" }]);
				setColors([""]);
				setStocks("");
				setBrand("apple");
				setCategory("mac");
			}
		} catch (err) {
			toast.error(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<h1 className="font-bold text-2xl mb-10">Add Product</h1>

			<form
				className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10"
				onSubmit={handleSubmit}
			>
				{/* LEFT SIDE */}
				<div className="space-y-5">
					{/* Images */}
					<div>
						<p className="font-semibold mb-2">Upload Images</p>
						<div className="flex flex-wrap items-center gap-2">
							{[0, 1, 2].map((index) => (
								<label key={index} htmlFor={`image${index}`}>
									<img
										src={
											images[index]
												? URL.createObjectURL(images[index])
												: "/uploadImg.png"
										}
										alt={`Image ${index + 1}`}
										className="w-20 h-20 border border-slate-300 cursor-pointer object-cover"
									/>
									<input
										type="file"
										id={`image${index}`}
										hidden
										accept="image/*"
										onChange={(e) => handleImageChange(e, index)}
									/>
								</label>
							))}
						</div>
					</div>

					{/* Product Name */}
					<div className="flex flex-col gap-2">
						<label htmlFor="name" className="font-semibold">
							Product Name
						</label>
						<input
							type="text"
							id="name"
							placeholder="Product Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="border border-slate-300 py-2 px-4 w-full"
						/>
					</div>

					{/* Description */}
					<div className="flex flex-col gap-2">
						<label htmlFor="description" className="font-semibold">
							Product Description
						</label>
						<textarea
							id="description"
							placeholder="Product Description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className="border border-slate-300 py-2 px-4 w-full min-h-[100px]"
						/>
					</div>

					{/* Price */}
					<div className="flex flex-col gap-2">
						<label htmlFor="price" className="font-semibold">
							Product Price
						</label>
						<input
							type="number"
							id="price"
							placeholder="Product Price"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							className="border border-slate-300 py-2 px-4 max-w-[200px]"
						/>
					</div>

					{/* Product Colors */}
					<div className="flex flex-col gap-2">
						<label className="font-semibold">Product Colors</label>

						{colors.map((color, index) => (
							<div key={index} className="flex items-center gap-2">
								<input
									type="text"
									placeholder="Enter a color (e.g. Blue)"
									value={color}
									onChange={(e) => handleColorChange(index, e.target.value)}
									className="border border-slate-300 py-2 px-4 max-w-[300px]"
								/>
								<button
									type="button"
									onClick={() => removeColorField(index)}
									className="text-red-500 text-sm"
								>
									Remove
								</button>
							</div>
						))}

						<button
							type="button"
							onClick={addColorField}
							className="text-blue-600 text-sm mt-2 text-left"
						>
							+ Add Color
						</button>
					</div>
				</div>

				{/* RIGHT SIDE */}
				<div className="space-y-5">
					{/* Product Specifications */}
					<div className="flex flex-col gap-2">
						<label className="font-semibold">Product Specifications</label>

						{specs.map((spec, index) => (
							<div
								key={index}
								className="flex flex-col sm:flex-row gap-2 items-stretch"
							>
								<input
									type="text"
									placeholder="Spec name (e.g. Battery)"
									value={spec.key}
									onChange={(e) =>
										handleSpecChange(index, "key", e.target.value)
									}
									className="border border-slate-300 py-2 px-4 w-full sm:max-w-[200px]"
								/>
								<input
									type="text"
									placeholder="Spec value (e.g. 5000mAh)"
									value={spec.value}
									onChange={(e) =>
										handleSpecChange(index, "value", e.target.value)
									}
									className="border border-slate-300 py-2 px-4 w-full flex-grow"
								/>
								<button
									type="button"
									onClick={() => removeSpecField(index)}
									className="text-red-500 text-sm"
								>
									Remove
								</button>
							</div>
						))}

						<button
							type="button"
							onClick={addSpecField}
							className="text-blue-600 text-sm mt-2 text-left"
						>
							+ Add Specification
						</button>
					</div>

					{/* Stocks, Brand, Category */}
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
						{/* Stocks */}
						<div className="flex flex-col gap-2">
							<label htmlFor="stocks">Product Stocks</label>
							<input
								type="number"
								id="stocks"
								placeholder="Stocks"
								value={stocks}
								onChange={(e) => setStocks(e.target.value)}
								className="border border-slate-300 py-2 px-4 w-full"
							/>
						</div>

						{/* Brand */}
						<div className="flex flex-col gap-2">
							<label htmlFor="brand">Product Brand</label>
							<input
								type="text"
								id="brand"
								placeholder="Brand"
								value={brand}
								onChange={(e) => setBrand(e.target.value)}
								className="border border-slate-300 py-2 px-4 w-full"
							/>
						</div>

						{/* Category */}
						<div className="flex flex-col gap-2">
							<label htmlFor="category">Product Category</label>
							<select
								id="category"
								className="border border-slate-300 py-2 px-4 w-full"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							>
								{allowedProductCategories.map((allowedCategory, i) => (
									<option value={allowedCategory} key={i}>
										{allowedCategory}
									</option>
								))}
							</select>
						</div>
					</div>

					<button
						type="submit"
						className="py-2 px-3 border bg-black text-white rounded-md hover:bg-white hover:text-black transition-all duration-150 cursor-pointer"
						disabled={isLoading}
					>
						{isLoading ? "Adding..." : "Add Product"}
					</button>
				</div>
			</form>
		</div>
	);
}

export default AddProduct;
