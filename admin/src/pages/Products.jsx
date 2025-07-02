import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductItem from "../components/ProductItem";
import { fetchProducts } from "../services/apiProducts";

function Products() {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const getProducts = async () => {
			try {
				setIsLoading(true);
				const res = await fetchProducts();
				setProducts(res.reverse());
			} catch (err) {
				toast.error(err.message);
			} finally {
				setIsLoading(false);
			}
		};

		getProducts();
	}, []);

	const handleProductUpdate = (updatedProduct) => {
		setProducts((prevProducts) =>
			prevProducts.map((product) =>
				product.id === updatedProduct._id ? updatedProduct : product
			)
		);
	};

	return (
		<div>
			<h1 className="font-bold text-2xl  mb-10">All Products</h1>

			<div className="border border-slate-300 grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] px-2 font-bold bg-black text-white mb-5">
				<p>Image</p>
				<p>Name</p>
				<p>Category</p>
				<p>Stocks</p>
				<p>Price</p>
				<p>Actions</p>
			</div>

			{isLoading && <p>Loading products...</p>}

			{products && !isLoading && (
				<ul className="space-y-2">
					{products.map((product) => (
						<ProductItem
							key={product.id}
							product={product}
							onProductUpdate={handleProductUpdate}
						/>
					))}
				</ul>
			)}
		</div>
	);
}

export default Products;
