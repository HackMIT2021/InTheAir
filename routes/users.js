const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");

const catchAsync = require("../utils/catchAsync");

const Control = require("../controllers/users_Control");

//=================================================================================================

router.get("/register", Control.registerForm);
router.get("/login", Control.loginForm);
router.get("/about", Control.aboutForm);
router.get("/contact", Control.contactForm);

router.get("/logout", Control.logOut);

router.post("/login", passport.authenticate("local", { failureRedirect: "/login" }), Control.logIn);

router.post("/register", catchAsync(Control.register));

//=================================================================================================

module.exports = router;
