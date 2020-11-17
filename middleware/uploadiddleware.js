const multer = require("multer"); // multer multipart form er file upload korar jonno help kore
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});

// middleware
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5 * 8,
  },
  fileFilter: (req, file, cb) => {
    const types = /jpeg|jpg|png|gif/;
    const extName = types.test(path.extname(file.originalname).toLowerCase());
    const mimeType = types.test(file.mimetype);

    if (extName && mimeType) {
      cb(null, true);
    } else {
      cb(new Error("Only Support Image"));
    }
  },
});

module.exports = upload;
