//=================================================================================================

const registerForm = (req, res) => {
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
	let returnTo = "/campgrounds";
	if (req.session.origin) {
		returnTo = req.session.origin;
		delete req.session.origin;
	}
	res.redirect(returnTo);
};

const logOut = (req, res) => {
	req.logout();
	res.redirect("/reports");
};

//=================================================================================================

module.exports = { registerForm, loginForm, aboutForm, contactForm, logOut, logIn };
