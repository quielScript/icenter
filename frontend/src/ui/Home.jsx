import BestSeller from "../features/products/BestSellers";
import LatestProducts from "../features/products/LatestProducts";
import Hero from "./Hero";
import Policy from "./Policy";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../services/apiProducts";

function Home() {
	const {
		data: products = [],
		isLoading,
		error,
	} = useQuery({
		queryKey: ["products"],
		queryFn: fetchProducts,
	});

	return (
		<div className="max-w-7xl mx-auto">
			{/* Hero */}
			<Hero />

			{/* Latest products */}
			<LatestProducts products={products} isLoading={isLoading} />

			{/* Best sellers */}
			<BestSeller products={products} isLoading={isLoading} />

			{/* Policy */}
			<Policy />
		</div>
	);
}

export default Home;
