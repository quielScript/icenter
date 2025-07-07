import { promisify } from "util";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import Email from "../utils/email.js";

// Create token
const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

// Create and send token
const createSendToken = (user, statusCode, req, res) => {
	const token = signToken(user._id);
	const cookieOptions = {
		expires: new Date(
			Date.now() +
				parseInt(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
		secure: req.secure || req.headers["x-forwarded-proto"] === "https",
	};

	if (process.env.NODE_ENV === "production") {
		cookieOptions.secure = true;
	}

	res.cookie("jwt", token, cookieOptions);

	// Remove user password from output
	user.password = undefined;

	res.status(statusCode).json({
		status: "success",
		token,
		data: {
			user,
		},
	});
};

const signup = catchAsync(async (req, res, next) => {
	const newUser = await User.create({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: req.body.password,
		passwordConfirm: req.body.passwordConfirm,
	});

	createSendToken(newUser, 201, req, res);
});

// Login for user
const login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new AppError("Please provide email and password", 400));
	}

	const user = await User.findOne({ email }).select("+password");

	if (!user || !(await user.correctPassword(password, user.password))) {
		return next(new AppError("Incorrect email or password", 401));
	}

	createSendToken(user, 200, req, res);
});

// Login for admin
export const loginAdmin = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new AppError("Please provide email and password", 400));
	}

	const user = await User.findOne({ email }).select("+password");

	if (!user || !(await user.correctPassword(password, user.password))) {
		return next(new AppError("Incorrect email or password", 401));
	}

	if (user.role !== "admin") {
		return next(
			new AppError("You are not authorized to access admin panel", 403)
		);
	}

	createSendToken(user, 200, req, res);
});

const protect = catchAsync(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	} else if (req.cookies.jwt) {
		token = req.cookies.jwt;
	}

	if (!token)
		return next(
			new AppError("You are lot logged in! Please log in to get access.", 401)
		);

	// Verify/validate token
	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	// Check if user exists
	const currentUser = await User.findById(decoded.id);

	if (!currentUser)
		return next(
			new AppError("The user belonging to this token no longer exists.", 401)
		);

	// Check if user changed password after token was issued
	if (currentUser.changedPasswordAfter(decoded.iat)) {
		return next(
			new AppError("User recently changed password! Please login again.", 401)
		);
	}

	// Grant access
	req.user = currentUser;
	next();
});

const restrictTo = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new AppError("You do not have permission to perform this action.", 403)
			);
		}

		next();
	};
};

export const updatePassword = catchAsync(async (req, res, next) => {
	const user = await User.findById(req.user.id).select("+password");

	// Check if current password is correct
	if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
		return next(new AppError("Your current password is wrong.", 401));
	}

	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	await user.save();

	// Log the user in
	createSendToken(user, 200, req, res);
});

export const forgotPassword = catchAsync(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });

	if (!user)
		return next(new AppError("There is no user with this email address.", 404));

	// Generate reset token
	const resetToken = user.createPasswordResetToken();
	await user.save({ validateBeforeSave: false });

	try {
		const resetURL = `${req.protocol}://${req.get(
			"host"
		)}/api/v1/users/resetPassword/${resetToken}`;

		const message = `Forgot you password? Submit a PATCH request with you new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

		await new Email(
			user,
			"Your password reset token (valid for 10 min)",
			message
		).sendPasswordReset();

		res.status(200).json({
			status: "success",
			message: "Token sent to email!",
		});
	} catch (err) {
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
		await user.save({ validateBeforeSave: false });

		return next(
			new AppError(
				"There was an error sending the email. Try again later!",
				500
			)
		);
	}
});

export const resetPassword = catchAsync(async (req, res, next) => {
	// Get user using reset token
	const hashedToken = crypto
		.createHash("sha256")
		.update(req.params.token)
		.digest("hex");

	const user = await User.findOne({
		passwordResetToken: hashedToken,
		passwordResetExpires: { $gt: Date.now() },
	});

	if (!user) return next(new AppError("Token is invalid or has expired", 400));

	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	user.passwordResetToken = undefined;
	user.passwordResetExpires = undefined;
	await user.save();

	// Log the user in
	createSendToken(user, 200, req, res);
});

export { signup, login, protect, restrictTo };
