import mongoose from "mongoose";
import crypto from "crypto";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, "Please provide your first name"],
	},
	lastName: {
		type: String,
		required: [true, "Please provide your last name"],
	},
	email: {
		type: String,
		required: [true, "Please provide your email"],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, "Please provide a valid email"],
	},
	photo: String,
	role: {
		type: String,
		enum: ["user", "admin"],
		default: "user",
	},
	password: {
		type: String,
		required: [true, "Please provide a password"],
		minlength: [8, "Password must be at least 8 characters long"],
		select: false,
	},
	passwordConfirm: {
		type: String,
		required: [true, "Please confirm your password"],
		// Validate on CREATE and SAVE
		validate: {
			validator: function (el) {
				return el === this.password;
			},
			message: "Passwords does not match!",
		},
	},
	passwordChangedAt: Date,
	passwordResetToken: String,
	passwordResetExpires: Date,
	active: {
		type: Boolean,
		default: true,
		select: false,
	},
});

// DOCUMENT MIDDLEWARES //
// Hash password
userSchema.pre("save", async function (next) {
	// Don't hash if password was not modified
	if (!this.isModified("password")) return next();

	this.password = await bcrypt.hash(this.password, 12);
	this.passwordConfirm = undefined;
	next();
});

// Check if password was changed
userSchema.pre("save", async function (next) {
	if (!this.isModified("password") || this.isNew) return next();

	this.passwordChangedAt = Date.now() - 1000;
	next();
});

// QUERY MIDDLEWARES //
// Exclude non-active users
userSchema.pre(/^find/, function (next) {
	this.find({ active: { $ne: false } });
	next();
});

// INSTANCE METHODS //
// Check correct password
userSchema.methods.correctPassword = async function (
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

// Check if user changed password after token was issued
userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
	if (this.passwordChangedAt) {
		const changedTimeStamp = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10
		);
		return JWTTimeStamp < changedTimeStamp;
	}

	return false;
};

// Create password reset token
userSchema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString("hex");

	this.passwordResetToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");

	// Expires in 10mins
	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

	return resetToken;
};

const User = mongoose.model("User", userSchema);

export default User;
