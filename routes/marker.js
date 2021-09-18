const express = require("express");
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync");

const Control = require("../controllers/markers_Control");

//=================================================================================================

router.get("/reports", Control.reportmap);

//=================================================================================================

module.exports = router;
