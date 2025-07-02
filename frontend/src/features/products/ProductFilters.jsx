import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import Button from "../../ui/Button";

function ProductFilters({
	selectedCategories,
	setSelectedCategories,
	minPrice,
	setMinPrice,
	maxPrice,
	setMaxPrice,
}) {
	const [showFilters, setShowFilters] = useState(false);
	const categories = ["mac", "iphone", "ipad", "watch", "audio", "accessory"];

	const handleToggleCategory = (category) => {
		setSelectedCategories((prev) =>
			prev.includes(category)
				? prev.filter((c) => c !== category)
				: [...prev, category]
		);
	};

	const handleClearFilters = () => {
		setSelectedCategories([]);
		setMinPrice();
		setMaxPrice();
	};

	return (
		<div className="space-y-2 lg:space-y-5 mb-5 md:mb-0">
			<div className="flex items-center gap-2">
				<p className="text-xl sm:text-2xl font-semibold">FILTERS</p>
				<button
					className="cursor-pointer md:hidden"
					onClick={() => setShowFilters((show) => !show)}
				>
					{showFilters ? <FaAngleUp /> : <FaAngleDown />}
				</button>
			</div>

			<div className="flex md:flex-col md:gap-0 gap-10 flex-row space-y-2 lg:space-y-5">
				{/* Filter by product */}
				<div className={`${showFilters ? "block" : "hidden"} md:block`}>
					<div>
						<p className="font-semibold mb-2">Product Categories</p>
					</div>

					{/* Filters */}
					<div className="flex flex-col gap-2">
						{categories.map((cat) => (
							<div className="flex items-center gap-2" key={cat}>
								<input
									type="checkbox"
									id={cat}
									checked={selectedCategories.includes(cat)}
									onChange={() => handleToggleCategory(cat)}
								/>
								<label htmlFor={cat} className="capitalize">
									{cat}
								</label>
							</div>
						))}
					</div>
				</div>

				{/* Filter by price */}
				<div className={`${showFilters ? "block" : "hidden"} md:block`}>
					<div>
						<p className="font-semibold mb-2">Price Range</p>
					</div>

					{/* Filters */}
					<div className="flex flex-col gap-2">
						<input
							type="number"
							placeholder="&#8369; MIN"
							min="0"
							className="border border-licorice-black p-1 md:p-2 rounded-xs"
							value={minPrice}
							onChange={(e) => setMinPrice(Number(e.target.value))}
						/>
						<input
							type="number"
							placeholder="&#8369; MAX"
							min="0"
							className="border border-licorice-black p-1 md:p-2 rounded-xs"
							value={maxPrice}
							onChange={(e) => setMaxPrice(Number(e.target.value))}
						/>
					</div>
				</div>
			</div>

			<div className={`${showFilters ? "block" : "hidden"} md:block`}>
				<Button btnType="button" onClick={handleClearFilters}>
					Clear Filters
				</Button>
			</div>
		</div>
	);
}

export default ProductFilters;
