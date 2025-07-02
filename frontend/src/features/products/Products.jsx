import SectionHeader from "../../ui/SectionHeader";
import ProductItem from "./ProductItem";
import ProductFilters from "./ProductFilters";
import { fetchProducts } from "../../services/apiProducts";
import { useLoaderData, useNavigation } from "react-router-dom";
import Loader from "../../ui/Loader";
import { useEffect, useMemo, useState } from "react";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";

function Products() {
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [minPrice, setMinPrice] = useState();
	const [maxPrice, setMaxPrice] = useState();
	const [searchQuery, setSearchQuery] = useState("");
	const [searchInput, setSearchInput] = useState("");
	const navigation = useNavigation();
	const products = useLoaderData();

	const isPageLoading = !products || navigation.state === "loading";

	useEffect(() => {
		// Debounce by 300ms
		const delayDebounce = setTimeout(() => {
			setSearchQuery(searchInput);
		}, 300);

		return () => clearTimeout(delayDebounce);
	}, [searchInput]);

	const filteredProducts = useMemo(() => {
		return products.filter((product) => {
			const inCategory =
				selectedCategories.length === 0 ||
				selectedCategories.includes(product.category?.toLowerCase());

			const inPriceRange =
				(!minPrice || product.price >= parseFloat(minPrice)) &&
				(!maxPrice || product.price <= parseFloat(maxPrice));

			const matchesSearch =
				!searchQuery ||
				product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				product.brand?.toLowerCase().includes(searchQuery.toLowerCase());

			return inCategory && inPriceRange && matchesSearch;
		});
	}, [maxPrice, minPrice, products, selectedCategories, searchQuery]);

	return (
		<div className="max-w-7xl mx-auto pt-5 md:pt-12 pb-24">
			<div className="flex flex-col md:flex-row gap-1 md:gap-10 mx-5">
				{/* Right hand */}
				<ProductFilters
					selectedCategories={selectedCategories}
					setSelectedCategories={setSelectedCategories}
					minPrice={minPrice}
					setMinPrice={setMinPrice}
					maxPrice={maxPrice}
					setMaxPrice={setMaxPrice}
				/>

				{/* Left hand */}
				<div>
					<div className="mb-5 flex flex-col items-start">
						<SectionHeader text1="discover" text2="products" />

						<div className="flex items-center gap-2 justify-between border border-slate-300 p-2 px-5 rounded-full w-full md:w-1/2 focus-within:border-black transition-border duration-150">
							<input
								type="text"
								placeholder="Search a product"
								className="outline-none w-full"
								value={searchInput}
								onChange={(e) => setSearchInput(e.target.value)}
							/>
							<button className="text-md cursor-pointer">
								{!searchInput ? (
									<FaMagnifyingGlass />
								) : (
									<FaXmark onClick={() => setSearchInput("")} />
								)}
							</button>
						</div>
					</div>

					{isPageLoading ? (
						<div className="flex items-center justify-center">
							<Loader />
						</div>
					) : filteredProducts.length === 0 ? (
						<p className="text-center text-gray-500">
							No products found for selected filters.
						</p>
					) : (
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
							{filteredProducts.map((product) => (
								<ProductItem product={product} key={product.id} />
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

// Product loader
export const loader = (queryClient) => {
	return async () => {
		const queryKey = ["products"];

		const cachedData = queryClient.getQueryData(queryKey);

		if (cachedData) return cachedData;

		const products = await fetchProducts();

		queryClient.setQueryData(queryKey, products);

		return products || [];
	};
};

export default Products;
