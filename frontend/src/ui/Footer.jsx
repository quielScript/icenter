import { FaEnvelope, FaLocationDot, FaPhone } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Footer() {
	return (
		<footer>
			<div className="bg-licorice-black py-10 px-10 md:px-24 text-white gap-5 md:gap-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] text-xs sm:text-base">
				<div className="space-y-5">
					<Link to="/" className="block">
						<img
							src="/images/logo-white.png"
							alt="icenter"
							className="w-[90px] md:w-[150px]"
						/>
					</Link>

					<p className="font-bold">
						All your favorite Apple products in one place
					</p>
					<p>
						Your one-stop shop for the latest Apple devices and accessories.
						Discover everything you need, tailored to your digital lifestyle.
					</p>
				</div>

				<div className="space-y-5">
					<p className="font-bold">Contact</p>
					<div className="flex flex-col gap-5">
						<div className="flex items-center gap-2">
							<FaPhone />
							<p>(704) 555-0127</p>
						</div>

						<div className="flex items-center gap-2">
							<FaEnvelope />
							<p>exequielarco23@gmail.com</p>
						</div>

						<div className="flex items-center gap-2">
							<FaLocationDot />
							<p>Philippines</p>
						</div>
					</div>
				</div>

				<div className="space-y-5">
					<p className="font-bold">Information</p>
					<ul className="flex flex-col gap-5">
						<li>
							<Link to="/me">My Account</Link>
						</li>
						<li>
							<Link to="/cart/123">My Cart</Link>
						</li>
						<li>
							<Link to="/order/123">Orders</Link>
						</li>
					</ul>
				</div>

				<div className="space-y-5">
					<p className="font-bold">Service</p>
					<ul className="flex flex-col gap-5">
						<li>
							<Link>Policy</Link>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
