import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

process.on("uncaughtException", (err) => {
	console.log("UNCAUGHT EXCEPTION! Shutting down...");
	console.log(err.name, err.message);
	process.exit(1);
});

// Connect to DB
connectDB();

// Connect to cloudinary
connectCloudinary();

// Start server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
	console.log(`Server running on PORT: ${port}...`);
});

process.on("unhandledRejection", (err) => {
	console.log("UNHANDLED REJECTION! Shutting down...");
	console.log(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});
