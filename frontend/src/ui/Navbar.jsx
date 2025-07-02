import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
	FaBars,
	FaBasketShopping,
	FaMagnifyingGlass,
	FaUser,
	FaXmark,
} from "react-icons/fa6";
import Button from "./Button";
import { getToken, removeToken } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCartQuantity, getUserCart } from "../features/cart/cartSlice";

function Navbar() {
	const [openNav, setOpenNav] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const token = useSelector(getToken);
	const cartQuantity = useSelector(getCartQuantity) || 0;

	useEffect(() => {
		if (token) {
			dispatch(getUserCart(token));
		}
	}, [token, dispatch]);

	const handleLogout = () => {
		dispatch(removeToken());
		navigate("/login");
	};

	return !openNav ? (
		<nav className="py-5">
			<div className="flex items-center justify-between text-licorice-black font-medium py-3 px-5 md:px-10 border border-licorice-black max-w-7xl xl:mx-auto mx-4 sm:mx-6 md:mx-10 rounded-xl">
				<Link to="/">
					<img
						src="/images/logo-main.png"
						alt="icenter"
						className="w-[90px] md:w-[150px]"
					/>
				</Link>

				<ul className="hidden md:flex items-center justify-center gap-6 text-licorice-black font-medium">
					<li>
						<NavLink to="/" className="flex flex-col items-center">
							<span>Home</span>
							<hr className="hidden w-2/4 border-none h-[1.5px] bg-licorice-black" />
						</NavLink>
					</li>
					<li className="flex items-center gap-2">
						<NavLink to="/products" className="flex flex-col items-center">
							<span>Products</span>
							<hr className="hidden w-2/4 border-none h-[1.5px] bg-licorice-black" />
						</NavLink>
					</li>
					<li>
						<NavLink to="/contact" className="flex flex-col items-center">
							<span>Contact Us</span>
							<hr className="hidden w-2/4 border-none h-[1.5px] bg-licorice-black" />
						</NavLink>
					</li>
				</ul>

				<div className="hidden md:flex items-center justify-center gap-6">
					{token && (
						<Link to="/cart" className="text-xl relative">
							<FaBasketShopping />
							<p className="text-xs absolute -top-2 -right-3 bg-licorice-black text-white p-1 rounded-full w-5 h-5 flex items-center justify-center">
								{cartQuantity}
							</p>
						</Link>
					)}
					{!token ? (
						<Button
							btnType="link"
							to="/login"
							className="text-white bg-licorice-black py-2 px-6 rounded-md"
						>
							Login
						</Button>
					) : (
						<div className="text-xl cursor-pointer relative group">
							<div>
								<FaUser />
							</div>

							{/* Dropdown */}
							<div className="absolute top-5 left-1/2 -translate-x-1/2 bg-slate-200 px-4 text-base w-36 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
								<ul className="flex flex-col text-center divide-y divide-gray-600">
									<li className="p-3">
										<Link to="/user">Profile</Link>
									</li>
									<li className="p-3">
										<Link to="/orders">Orders</Link>
									</li>
									<li className="p-3">
										<button onClick={handleLogout}>Log out</button>
									</li>
								</ul>
							</div>
						</div>
					)}
				</div>

				{/* Mobile nav toggle */}
				<div className="md:hidden flex items-center justify-center gap-6 text-xl">
					<button className="text-base">
						<FaMagnifyingGlass />
					</button>
					<Link to="/cart" className="text-base">
						<FaBasketShopping />
					</Link>
					<button
						onClick={() => setOpenNav((open) => !open)}
						className="text-base cursor-pointer"
					>
						<FaBars />
					</button>
				</div>
			</div>
		</nav>
	) : (
		<div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
			{/* Close Button */}
			<button
				onClick={() => setOpenNav(false)}
				className="absolute top-5 right-5 text-3xl text-licorice-black"
			>
				<FaXmark />
			</button>

			{/* Mobile Nav Links */}
			<ul className="flex flex-col items-center gap-6 text-lg font-medium text-licorice-black">
				<li>
					<Link to="/" onClick={() => setOpenNav(false)}>
						HOME
					</Link>
				</li>
				<li>
					<Link to="/products" onClick={() => setOpenNav(false)}>
						PRODUCTS
					</Link>
				</li>
				<li>
					<Link to="/contact" onClick={() => setOpenNav(false)}>
						CONTACT US
					</Link>
				</li>
			</ul>
		</div>
	);
}

export default Navbar;
