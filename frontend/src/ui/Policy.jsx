import { FaHeadset, FaSackDollar, FaTruck, FaWallet } from "react-icons/fa6";
import SectionHeader from "./SectionHeader";

function Policy() {
	return (
		<div className="mx-5 xl:mx-0 pb-24">
			<SectionHeader text1="our" text2="policy" />
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
				<div className="text-licorice-black space-y-2 shadow shadow-heliotrope-gray p-5 rounded-md">
					<FaTruck className="text-2xl md:text-4xl" />
					<p className="text-lg md:text-2xl font-bold">Fast Shipping</p>
					<p>Delivers within 1 week</p>
				</div>
				<div className="text-licorice-black space-y-2 shadow shadow-heliotrope-gray p-5 rounded-md">
					<FaSackDollar className="text-2xl md:text-4xl" />
					<p className="text-lg md:text-2xl font-bold">Money Guarantee</p>
					<p>Within 30 days for an exchange</p>
				</div>
				<div className="text-licorice-black space-y-2 shadow shadow-heliotrope-gray p-5 rounded-md">
					<FaHeadset className="text-2xl md:text-4xl" />
					<p className="text-lg md:text-2xl font-bold">Online Support</p>
					<p>24 hours a day, 7 days a week</p>
				</div>
				<div className="text-licorice-black space-y-2 shadow shadow-heliotrope-gray p-5 rounded-md">
					<FaWallet className="text-2xl md:text-4xl" />
					<p className="text-lg md:text-2xl font-bold">Flexible Payment</p>
					<p>Pay online or cash on delivery</p>
				</div>
			</div>
		</div>
	);
}

export default Policy;
