//=================================================================================================

const registerForm = (req, res) => {
	res.render("users/signup");
};

const loginForm = (req, res) => {
	res.render("user/login");
};

const logout = (req, res) => {};

//=================================================================================================

module.exports = { registerForm, loginForm, logout };
