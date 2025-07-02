import multer from "multer";

// Storage config
const storage = multer.diskStorage({
	filename: function (req, file, cb) {
		cb(null, Date.now() + "-" + file.originalname);
	},
});

// Upload middleware
const uploadMulter = multer({ storage });

export default uploadMulter;
