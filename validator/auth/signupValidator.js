const { body } = require("express-validator"); // check niyeo korte partam, but ekhane body niye korlam
const User = require("../../models/User");

module.exports = [
  body("username")
    .isLength({ min: 2, max: 15 })
    .withMessage("Username Must be Between 2 to 15 characters")
    .custom(async (username) => {
      let user = await User.findOne({ username });
      if (user) {
        return Promise.reject("Username Already used");
      }
    })
    .trim(),

  body("email")
    .isEmail()
    .withMessage("Please Provide a Valid Email")
    .custom(async (email) => {
      let user = await User.findOne({ email });
      if (user) {
        return Promise.reject("Email Already used");
      }
    })
    .normalizeEmail(),

  body("password")
    .isLength({ min: 5 })
    .withMessage("Your Password Must be Greater than 5 chars"),

  body("confirmPassword")
    .isLength({ min: 5 })
    .withMessage("Your Password Must be Greater than 5 chars")
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error("Password Does not Match");
      }
      return true;
    }),
];
