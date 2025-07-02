import { NavLink } from "react-router-dom";
import {
	FaBasketShopping,
	FaClipboardList,
	FaSquarePlus,
} from "react-icons/fa6";

function Navbar() {
	return (
		<nav className="py-5 border-r border-slate-300 pl-5 min-h-dvh">
			<ul className="space-y-5">
				<li>
					<NavLink
						to="/admin/add-product"
						className="flex items-center gap-2 border border-r-0 border-slate-300 py-2 px-4 rounded-md rounded-r-none"
					>
						<span>
							<FaSquarePlus />
						</span>
						<span>Add Product</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/admin/products"
						className="flex items-center gap-2 border border-r-0 border-slate-300 py-2 px-4 rounded-md rounded-r-none"
					>
						<span>
							<FaClipboardList />
						</span>
						<span>Products</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/admin/orders"
						className="flex items-center gap-2 border border-r-0 border-slate-300 py-2 px-4 rounded-md rounded-r-none"
					>
						<span>
							<FaBasketShopping />
						</span>
						<span>Orders</span>
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
