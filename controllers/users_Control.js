const User = require("../models/Users");

//=================================================================================================

const registerForm = (req, res) => {
	console.log("login successful");
	res.render("Users/signup");
};

const loginForm = (req, res) => {
	res.render("Users/login");
};

const aboutForm = (req, res) => {
	res.render("Users/about");
};

const contactForm = (req, res) => {
	res.render("Users/contact");
};

const logIn = (req, res) => {
	req.flash("success", "Welcome back!");
	let returnTo = "/reports";
	if (req.session.origin) {
		returnTo = req.session.origin;
		delete req.session.origin;
	}
	res.redirect(returnTo);
};

const logOut = (req, res) => {
	req.logout();
	req.flash("success", "You have logged out!");
	res.redirect("/reports");
};

const register = async (req, res) => {
	try {
		const { email, username, password } = req.body.newUser;
		let user = new User({ email, username });
		user = await User.register(user, password);
		req.login(user, (err) => {
			if (err) return next(err);
			req.flash("success", "Welcome to InTheAir!");
			return res.redirect("/reports");
		});
	} catch (err) {
		return res.redirect("/register");
	}
};

//=================================================================================================

module.exports = { registerForm, loginForm, aboutForm, contactForm, logOut, logIn, register };
