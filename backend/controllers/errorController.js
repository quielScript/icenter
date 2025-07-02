import AppError from "../utils/appError.js";

const handleCastErrorDB = (err) => {
	const message = `Invalid ${err.path}: ${err.value}`;
	return new AppError(message, 400);
};

const handleDuplicateErrorDB = (err) => {
	const field = Object.keys(err.keyValue);
	const value = Object.values(err.keyValue);
	const message = `Duplicate ${field}: ${value}. Please use another value!`;
	return new AppError(message, 400);
};

const handleValidationDB = (err) => {
	const errors = Object.values(err.errors).map((error) => error.message);
	const message = errors.join(". ");
	return new AppError(message, 400);
};

const handleJWTError = () =>
	new AppError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = () =>
	new AppError("Your token has expired!. Please login again.", 401);

const sendErrorDev = (err, res) => {
	// Detailed error for dev
	res.status(err.statusCode).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack,
	});
};

const sendErrorProd = (err, res) => {
	// Operational/trusted error: send message to client
	if (err.isOperational) {
		// Human-friendly
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});
	} else {
		// Programming/other unknown error: don't leak to client
		console.log("ERROR!", err);
		// Generic message
		res.status(500).json({
			status: "error",
			message: "Something went wrong!",
		});
	}
};

const globalErrorHandler = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";

	if (process.env.NODE_ENV === "development") {
		sendErrorDev(err, res);
	} else if (process.env.NODE_ENV === "production") {
		let error = { ...err };

		if (err.name === "CastError") {
			error = handleCastErrorDB(error);
		}

		if (err.code === 11000) {
			error = handleDuplicateErrorDB(error);
		}

		if (err.name === "ValidationError") {
			error = handleValidationDB(error);
		}

		if (err.name === "JsonWebTokenError") {
			error = handleJWTError();
		}

		if (err.name === "TokenExpiredError") {
			error = handleJWTExpiredError();
		}

		sendErrorProd(error, res);
	}
};

export default globalErrorHandler;
