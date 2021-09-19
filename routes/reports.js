const express = require("express");
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync");

const { isAuth, checkAuthor, checkReportNum } = require("../middleware");

const Control = require("../controllers/reports_Control");

//=================================================================================================

router.get("/", catchAsync(Control.reportmap));

router.get("/new", isAuth, checkReportNum, Control.reportForm);

router.get("/:id", catchAsync(Control.showReport));

router.get("/edit/:id", isAuth, checkAuthor, catchAsync(Control.editForm));

router.post("/", isAuth, checkReportNum, catchAsync(Control.addReport));

router.put("/:id", isAuth, checkAuthor, catchAsync(Control.editReport));

router.delete("/:id", isAuth, checkAuthor, catchAsync(Control.destroyReport));

//=================================================================================================

module.exports = router;
