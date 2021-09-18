const ExpressError = require("./utils/ExpressError");

const { reportSchema } = require("./joischemas");

const Report = require("./models/Reports");

//=================================================================================================

const isAuth = (req, res, next) => {
	if (!req.isAuthenticated()) {
		// Behaviour to return to
		req.session.origin = req.originalUrl;

		req.flash("error", "You must be signed in to use this function");
		//console.log("You must be signed in to use this function");
		return res.redirect("/login");
	}
	next();
};

const validateReport = (req, res, next) => {
	const { error } = reportSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(",");
		throw new ExpressError(400, msg);
	}
	next();
};

//=================================================================================================

module.exports = { isAuth, validateReport };
