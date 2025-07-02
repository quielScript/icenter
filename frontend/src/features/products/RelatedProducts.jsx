import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../services/apiProducts";
import SectionHeader from "../../ui/SectionHeader";
import ProductItem from "./ProductItem";
import Loader from "../../ui/Loader";

function RelatedProducts({ category, currProductId }) {
	const {
		data: products = [],
		isLoading,
		error,
	} = useQuery({
		queryKey: ["products"],
		queryFn: fetchProducts,
	});

	const relatedProducts = products.filter(
		(product) => product.category === category && product.id !== currProductId
	);

	return (
		<div className="pt-16">
			<div className="text-center">
				<SectionHeader text1="related" text2="products" />
			</div>

			{isLoading ? (
				<div className="flex items-center justify-center">
					<Loader />
				</div>
			) : (
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
					{relatedProducts.map((product) => (
						<ProductItem product={product} key={product.id} />
					))}
				</div>
			)}
		</div>
	);
}

export default RelatedProducts;
