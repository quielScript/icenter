import { FaFile, FaPenToSquare, FaUpload } from "react-icons/fa6";
import Button from "../../ui/Button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, getUserInfo, updateUserInfo } from "./userSlice";
import { getToken } from "../auth/authSlice";
import { useEffect } from "react";

function PersonalInfo() {
	const [isEditing, setIsEditing] = useState(false);
	const [userPhoto, setUserPhoto] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const dispatch = useDispatch();
	const token = useSelector(getToken);
	const {
		firstName: userFirstName = "",
		lastName: userLastName = "",
		email: userEmail = "",
		photo,
	} = useSelector(getUser);

	useEffect(() => {
		setFirstName(userFirstName);
		setLastName(userLastName);
		setEmail(userEmail);
	}, [userFirstName, userLastName, userEmail]);

	const handleToggleEdit = (e) => {
		e.preventDefault();
		setIsEditing((prev) => !prev);
	};

	const handleUpdateUser = (e) => {
		e.preventDefault();

		if (
			userFirstName.toLowerCase() === firstName.toLowerCase() &&
			userLastName.toLowerCase() === lastName.toLowerCase() &&
			userEmail.toLowerCase() === email.toLowerCase() &&
			!userPhoto
		) {
			setIsEditing(false);
			return;
		}

		const userInfo = new FormData();
		userInfo.append("firstName", firstName);
		userInfo.append("lastName", lastName);
		userInfo.append("email", email);
		userPhoto && userInfo.append("photo", userPhoto);

		dispatch(updateUserInfo({ userInfo, token }));
		setIsEditing(false);
	};

	return (
		<div>
			<form>
				<div className="flex items-center justify-between mb-5">
					<label
						htmlFor="userPhoto"
						className={`group w-15 h-15 flex items-center justify-center md:w-20 md:h-20 rounded-full border ${
							!isEditing
								? "border-slate-300 cursor-not-allowed"
								: "border-licorice-black cursor-pointer"
						}`}
					>
						<img
							src={
								userPhoto
									? // If uploading a new one
									  URL.createObjectURL(userPhoto)
									: // If photo exists from DB
									photo?.startsWith("http")
									? photo
									: // Fallback/default
									  "/images/avatar.jpg"
							}
							alt="avatar"
							className="w-18 h-18 rounded-full group-hover:hidden object-cover"
						/>
						<FaUpload
							className={`hidden group-hover:block ${
								!isEditing ? "cursor-not-allowed" : "cursor-pointer"
							}`}
						/>
						<input
							type="file"
							id="userPhoto"
							hidden
							disabled={!isEditing}
							onChange={(e) => setUserPhoto(e.target.files[0])}
						/>
					</label>

					{!isEditing ? (
						<Button btnType="button" onClick={handleToggleEdit}>
							<p className="flex items-center justify-center gap-2">
								<span>
									<FaPenToSquare />
								</span>
								<span>Edit Profile</span>
							</p>
						</Button>
					) : (
						<Button btnType="button" onClick={handleUpdateUser}>
							<p className="flex items-center justify-center gap-2">
								<span>
									<FaFile />
								</span>
								<span>Save Changes</span>
							</p>
						</Button>
					)}
				</div>

				<div className="grid grid-cols-1  md:grid-cols-2 gap-5">
					<div className="flex flex-col">
						<label htmlFor="firstName">First Name</label>
						<input
							type="text"
							name="firstName"
							id="firstName"
							className={`border rounded-md py-2 px-4 transition-all duration-150 ${
								!isEditing
									? "border-slate-300 cursor-not-allowed"
									: "border-licorice-black"
							}`}
							disabled={!isEditing}
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</div>

					<div className="flex flex-col">
						<label htmlFor="lastName">Last Name</label>
						<input
							type="text"
							name="lastName"
							id="lastName"
							className={`border rounded-md py-2 px-4 transition-all duration-150 ${
								!isEditing
									? "border-slate-300 cursor-not-allowed"
									: "border-licorice-black"
							}`}
							disabled={!isEditing}
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
					</div>

					{/* <div className="flex flex-col">
						<label htmlFor="contactNumber">Contact Number</label>
						<input
							type="text"
							name="contactNumber"
							id="contactNumber"
							placeholder="Contact Number"
							className={`border rounded-md py-2 px-4 transition-all duration-150 ${
								!isEditing ? "border-slate-300" : "border-licorice-black"
							}`}
							disabled={!isEditing}
						/>
					</div> */}

					<div className="flex flex-col">
						<label htmlFor="email">Email</label>
						<input
							type="text"
							name="email"
							id="email"
							className={`border rounded-md py-2 px-4 transition-all duration-150 ${
								!isEditing
									? "border-slate-300 cursor-not-allowed"
									: "border-licorice-black"
							}`}
							disabled={!isEditing}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					{/* <div className="flex flex-col">
						<label htmlFor="address">Address</label>
						<input
							type="text"
							name="address"
							id="address"
							placeholder="Address"
							className={`border rounded-md py-2 px-4 transition-all duration-150 ${
								!isEditing ? "border-slate-300" : "border-licorice-black"
							}`}
							disabled={!isEditing}
						/>
					</div>

					<div className="flex flex-col">
						<label htmlFor="zipCode">Zip Code</label>
						<input
							type="text"
							name="zipCode"
							id="zipCode"
							placeholder="Zip Code"
							className={`border rounded-md py-2 px-4 transition-all duration-150 ${
								!isEditing ? "border-slate-300" : "border-licorice-black"
							}`}
							disabled={!isEditing}
						/>
					</div> */}
				</div>
			</form>
		</div>
	);
}

export default PersonalInfo;
