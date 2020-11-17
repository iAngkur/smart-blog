const router = require("express").Router();

const { isAuthenticated } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadiddleware");

const { uploadProfilePics } = require("../controllers/uploadController");

router.post(
  "/profilePics",
  isAuthenticated,
  upload.single("profilePics"),
  uploadProfilePics
);

module.exports = router;
