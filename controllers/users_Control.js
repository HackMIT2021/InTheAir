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

const logout = (req, res) => {};

//=================================================================================================

module.exports = { registerForm, loginForm, aboutForm, contactForm, logout };
