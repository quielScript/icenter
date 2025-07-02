import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";

function AppLayout() {
	return (
		<div>
			<Header />
			<main>
				<div className="grid grid-cols-[1fr_6fr]">
					<Navbar />
					<div className="m-10">
						<Outlet />
					</div>
				</div>
			</main>
		</div>
	);
}

export default AppLayout;
