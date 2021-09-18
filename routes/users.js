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

router.get("/logout", Control.logout);

router.post("/login");

//=================================================================================================

module.exports = router;
