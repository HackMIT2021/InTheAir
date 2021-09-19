const express = require("express");
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync");

const { isAuth, checkAuthor } = require("../middleware");

const Control = require("../controllers/reports_Control");

//=================================================================================================

router.get("/", catchAsync(Control.reportmap));

router.get("/new", isAuth, Control.reportForm);

router.get("/:id", catchAsync(Control.showReport));

router.get("/edit/:id", isAuth, checkAuthor, catchAsync(Control.editForm));

router.post("/", isAuth, catchAsync(Control.addReport));

router.put("/:id", isAuth, checkAuthor, catchAsync(Control.editReport));

router.delete("/:id", isAuth, checkAuthor, catchAsync(Control.destroyReport));

//=================================================================================================

module.exports = router;
