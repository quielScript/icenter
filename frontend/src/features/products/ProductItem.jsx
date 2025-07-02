import { Link } from "react-router-dom";

function ProductItem({ product }) {
	if (!product) return;

	return (
		<Link
			to={`/products/${product.id}`}
			className="shadow shadow-heliotrope-gray rounded-sm hover:-translate-y-0.5 hover:shadow-black hover:shadow transition-all duration-200"
		>
			<img src={`${product.images[0]}`} alt="" className="w-full" />
			<div className="p-5 space-y-5 text-licorice-black">
				<p className="text-base">{product.name}</p>
				<div className="flex items-center justify-between">
					<p className="font-semibold">₱{product.price.toLocaleString()}</p>
					<p>{product.sold} Sold</p>
				</div>
			</div>
		</Link>
	);
}

export default ProductItem;
