const express = require("express");
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync");

const { isAuth } = require("../middleware");

const Control = require("../controllers/reports_Control");

//=================================================================================================

router.get("/", Control.reportmap);

router.get("/new", isAuth, Control.reportForm);

//=================================================================================================

module.exports = router;
