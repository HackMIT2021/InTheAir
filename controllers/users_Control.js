//=================================================================================================

const registerForm = (req, res) => {
	res.render("Users/signup");
};

const loginForm = (req, res) => {
	res.render("Users/login");
};

const logout = (req, res) => {};

//=================================================================================================

module.exports = { registerForm, loginForm, logout };
