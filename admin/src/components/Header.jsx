import { useAuth } from "../context/AuthContext";

function Header() {
	const { logoutAdmin } = useAuth();

	return (
		<nav>
			<div className="border border-slate-300 py-5 px-10 flex items-center justify-between">
				<h1 className="text-2xl font-bold">iCenter Admin Panel</h1>
				<button
					onClick={logoutAdmin}
					className="py-2 px-3 border bg-black text-white rounded-md hover:bg-white hover:text-black transition-all duration-150 cursor-pointer"
				>
					Log Out
				</button>
			</div>
		</nav>
	);
}

export default Header;
