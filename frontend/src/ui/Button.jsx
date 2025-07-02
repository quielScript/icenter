import { Link } from "react-router-dom";

function Button({ to, btnType, children, full, onClick }) {
	const baseClass = `text-white bg-licorice-black py-2 px-4 sm:px-6 rounded-md text-center text-xs md:text-base`;
	const fullClass = full ? "w-full block" : "";

	if (btnType === "link") {
		return (
			<Link to={to} className={`${baseClass} ${fullClass}`}>
				{children}
			</Link>
		);
	}

	return (
		<button
			type="submit"
			className={`${baseClass} ${fullClass}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default Button;
