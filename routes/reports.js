const express = require("express");
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync");

const Control = require("../controllers/reports_Control");

//=================================================================================================

router.get("/", Control.reportmap);

router.get("/new", Control.reportForm);

//=================================================================================================

module.exports = router;
