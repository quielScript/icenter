import express, { json } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import cookieParser from "cookie-parser";

import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";

import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cartItemRouter from "./routes/cartItemRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";

const app = express();

// Cors config
app.use(
	cors({
		origin: [
			process.env.FRONTEND_DEV_ORIGIN,
			process.env.ADMIN_DEV_ORIGIN,
			process.env.FRONTEND_PROD_ORIGIN,
			process.env.ADMIN_PROD_ORIGIN,
		],
		credentials: true,
	})
);
app.options("*", cors());

// GLOBAL MIDDLEWARES
// Inject data to req body
app.use(json({ limit: "10kb" }));

// Parse cookie
app.use(cookieParser());

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

// Data sanitization against NoSQL injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Test middleware
app.use((req, res, next) => {
	next();
});

// Routes
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/carts", cartItemRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/reviews", reviewRouter);

// Fallback route
app.all("*", function (req, res, next) {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(globalErrorHandler);

export default app;
