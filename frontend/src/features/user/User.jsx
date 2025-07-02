import { NavLink, Outlet } from "react-router-dom";
import { FaBoxOpen, FaGear, FaUser } from "react-icons/fa6";
import SectionHeader from "../../ui/SectionHeader";
import { useDispatch, useSelector } from "react-redux";
import { getUser, getUserInfo } from "./userSlice";
import { useEffect } from "react";
import { getToken } from "../auth/authSlice";

function User() {
	const dispatch = useDispatch();
	const user = useSelector(getUser);
	const token = useSelector(getToken);

	useEffect(() => {
		// Only get user info if it is not in store
		if (token && !user?._id) {
			dispatch(getUserInfo(token));
		}
	}, [token, dispatch, user]);

	return (
		<div className="max-w-7xl xl:mx-auto mx-10 pt-6 md:pt-16 pb-14 md:pb-24">
			<SectionHeader text1="my" text2="profile" />

			<div className="flex flex-col sm:flex-row gap-5 sm:gap-10">
				{/* Right hand */}
				<div className="border border-slate-300 md:w-1/5">
					<div className="flex flex-col lg:flex-row items-center gap-3 p-2 border-b border-slate-300">
						<img
							className="w-12 h-12 md:w-15 md:h-15 rounded-full object-cover"
							src={user?.photo || "/images/avatar.jpg"}
							alt="Avatar"
						/>

						<div>
							<p>Hello 👋</p>
							<p className="text-base font-bold md:text-lg">{user.firstName}</p>
						</div>
					</div>

					<div className="text-xs md:text-base py-5">
						<NavLink to="info">
							<div className="userNav flex items-center gap-3 p-4 text-black">
								<span className="text-lg">
									<FaUser />
								</span>
								<p>Personal Information</p>
							</div>
						</NavLink>

						<NavLink to="orders">
							<div className="userNav flex items-center gap-3 p-4 text-black">
								<span className="text-lg">
									<FaBoxOpen />
								</span>
								<p>My Orders</p>
							</div>
						</NavLink>

						<NavLink to="settings">
							<div className="userNav flex items-center gap-3 p-4 text-black">
								<span className="text-lg">
									<FaGear />
								</span>
								<p>Settings</p>
							</div>
						</NavLink>
					</div>
				</div>

				{/* Left hand */}
				<div className="flex-1">
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default User;
