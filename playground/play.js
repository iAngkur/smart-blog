const router = require("express").Router();
// "check" diye body, cookies, headers, params, query theke data extract kora jabe
const { check, validationResult } = require("express-validator");

const Flash = require("../utils/Flash");

// file upload middleware
const upload = require("../middleware/uploadiddleware");

router.get("/play", (req, res, next) => {
  // console.log(req.flash("fail"));
  // console.log(req.flash("success"));

  // console.log(Flash.getMessage(req));

  res.render("playground/play", {
    title: "Validator Playground",
    flashMessage: {},
  });
});
router.post(
  "/play",

  upload.single("my-file"), // file upload

  // [
  //   check("username")
  //     .not()
  //     .isEmpty()
  //     .withMessage("Username cannot be Empty")
  //     .isLength({ max: 15 })
  //     .withMessage("Username cannot be greater than 15 characters")
  //     .trim(), // eta sanitizer

  //   check("email")
  //     .isEmail()
  //     .withMessage("Please Provide a Valid Email")
  //     .normalizeEmail(), // eta sanitizer

  //   // customr validator
  //   check("password").custom((value) => {
  //     if (value.length < 5) {
  //       throw new Error("Password Must be greater than 5 characters");
  //     }
  //     return true;
  //   }),
  //   check("confirmPassword").custom((value, { req }) => {
  //     if (value !== req.body.password) {
  //       throw new Error("Password Does not Match");
  //     }
  //   }),
  // ],
  (req, res, next) => {
    // let errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //   req.flash("fail", "There is Some Error");
    // } else {
    //   req.flash("success", "There is No Error");
    // }

    // file upload hoyese kina checking...
    if (req.file) {
      console.log(req.file);
    }

    res.redirect("/playground/play");

    // const formatter = (error) => error.msg; // amader shudhu msg gula dorkar, seta alada kore nite pari format kore

    /*     console.log(errors.isEmpty());
    console.log(errors.array());
    console.log(errors.mapped()); */
    // console.log(errors.formatWith(formatter).mapped());
    // console.log(req.body.username, req.body.email);

    // res.render("playground/signup", { title: "Validator Playground" });
  }
);

module.exports = router;
