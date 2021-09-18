const express = require("express");
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync");

const { isAuth } = require("../middleware");

const Control = require("../controllers/reports_Control");

//=================================================================================================

router.get("/", catchAsync(Control.reportmap));

router.get("/new", isAuth, Control.reportForm);

router.get("/:id", catchAsync(Control.showReport));

router.post("/", isAuth, catchAsync(Control.addReport));

//=================================================================================================

module.exports = router;
