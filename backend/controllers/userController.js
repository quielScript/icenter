import cloudinary from "cloudinary";
import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

const filterObj = (obj, ...allowedFields) => {
	const newObj = {};

	Object.keys(obj).forEach((key) => {
		if (allowedFields.includes(key)) {
			newObj[key] = obj[key];
		}
	});

	return newObj;
};

const getMe = (req, res, next) => {
	req.params.id = req.user.id;
	next();
};

const updateMe = catchAsync(async (req, res, next) => {
	if (req.body.password || req.body.passwordConfirm)
		return next(
			new AppError(
				"This route is not for password updates. Please use /updateMyPassword",
				400
			)
		);

	const filteredBody = filterObj(req.body, "firstName", "lastName", "email");

	if (req.files && req.files.photo && req.files.photo[0]) {
		const uploaded = await cloudinary.uploader.upload(req.files.photo[0].path, {
			resource_type: "image",
		});
		filteredBody.photo = uploaded.secure_url;
	}

	const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		status: "success",
		data: {
			user: updatedUser,
		},
	});
});

const deleteMe = catchAsync(async (req, res, next) => {
	await User.findByIdAndUpdate(req.user.id, { active: false });

	res.status(204).json({
		status: "success",
		data: null,
	});
});

const createUser = catchAsync(async (req, res, next) => {
	res.status(500).json({
		status: "error",
		message: "This route is not defined! Please use /signup instead",
	});
});

const getAllUsers = catchAsync(async (req, res, next) => {
	const users = await User.find();

	res.status(200).json({
		status: "success",
		results: users.length,
		data: {
			users,
		},
	});
});

const getUser = catchAsync(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	if (!user) return next(new AppError("No user found with that ID", 404));

	res.status(200).json({
		status: "success",
		data: {
			user,
		},
	});
});

// Do NOT update passwords with this
const updateUser = catchAsync(async (req, res, next) => {
	const user = await User.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	if (!user) return next(new AppError("No user found with that ID", 404));

	res.status(200).json({
		status: "success",
		data: {
			user,
		},
	});
});

const deleteUser = catchAsync(async (req, res, next) => {
	const user = await User.findByIdAndDelete(req.params.id);

	if (!user) return next(new AppError("No user found with that ID", 404));

	res.status(204).json({
		status: "success",
		data: null,
	});
});

export {
	getMe,
	updateMe,
	deleteMe,
	createUser,
	getAllUsers,
	getUser,
	updateUser,
	deleteUser,
};
