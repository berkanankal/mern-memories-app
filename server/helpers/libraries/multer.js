const multer = require("multer");
const path = require("path");
const CustomError = require("../error/CustomError");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const rootDir = path.dirname(require.main.filename);
    cb(null, path.join(rootDir, "/public/uploads"));
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split("/")[1];
    cb(null, file.fieldname + "-" + Date.now() + "." + extension);
  },
});

const fileFilter = (req, file, cb) => {
  allowedTypes = ["image/jpg", "image/gif", "image/jpeg", "image/png"];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new CustomError("Please provide a valid image file", 400), false);
  }
  return cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2097152 },
});

module.exports = upload;
