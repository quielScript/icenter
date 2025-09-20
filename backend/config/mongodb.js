import mongoose from "mongoose";

const DB = process.env.MONGODB_URI?.replace(
	"<db_password>",
	encodeURIComponent(process.env.MONGODB_PASSWORD)
);

// TODO: FIX MONGODB CONNECTION
const connectDB = async () => {
	try {
		await mongoose.connect(DB);
		console.log("DB CONNECTION SUCCESSFUL!");
	} catch (err) {
		console.log("DB CONNECTION FAILED: ", err.message);
		process.exit(1);
	}
};

export default connectDB;
