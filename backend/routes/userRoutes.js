import express from "express";
import {
	signup,
	login,
	protect,
	restrictTo,
	forgotPassword,
	loginAdmin,
	resetPassword,
	updatePassword,
} from "../controllers/authController.js";
import {
	createUser,
	deleteMe,
	deleteUser,
	getAllUsers,
	getMe,
	getUser,
	updateMe,
	updateUser,
} from "../controllers/userController.js";
import uploadMulter from "../middlewares/multer.js";

const router = express.Router();

// Public Routes //
router.post("/signup", signup);
router.post("/login", login);
router.post("/admin/login", loginAdmin);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

// Protected Routes //
router.use(protect);

router.get("/me", getMe, getUser);
router.patch("/updateMyPassword", updatePassword);
router.patch(
	"/updateMe",
	uploadMulter.fields([{ name: "photo", maxCount: 1 }]),
	updateMe
);
router.delete("/deleteMe", deleteMe);

// Admin features
router.use(restrictTo("admin"));

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;
