const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/userModel");
const Email = require("../utils/email");

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET);
};

const createSendToken = (user, code, req, res) => {
	const token = signToken(user._id);
	const cookieOptions = {
		expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
		httpOnly: true,
	};
	res.cookie("jwt", token, cookieOptions);
	user.password=undefined;
	res.status(code).json({
		status: "success",
		token,
		data: {
			user,
		},
	});
};

exports.signup = async (req, res) => {
	try {
		const newUser = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		});
		createSendToken(newUser, 201, req, res);
	} catch (err) {
		res.status(200).json({
			status: "fail",
			message: "User already exists",
		});
	}
};
exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (!user || !(await user.correctPassword(password, user.password))) {
			res.status(200).json({
				status: "fail",
				message: "incorrect email or password",
			});
		} else {
			createSendToken(user, 200, req, res);
		}
	} catch (err) {
		res.status(200).json({
			status: "fail",
			message: "user failed to login",
		});
	}
};

exports.logout = (req, res) => {
	res.cookie("jwt", "loggedout", {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true,
	});
	res.status(200).json({ status: "success" });
};

exports.isLoggedIn = async (req, res, next) => {
	res.locals.user = null;
	if (req.cookies.jwt) {
		try {
			const decoded = await jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);

			const currentUser = await User.findById(decoded.id);

			if (!currentUser) return next();
			res.locals.user = currentUser;

			return next();
		} catch (err) {
			return next();
		}
	}

	return next();
};

exports.forgotPassword = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			res.status(200).json({
				status: "fail",
				message: "user doesn't exist",
			});
		}
		const resetToken = user.createResetToken();
		await user.save();
		const reseturl = `http://localhost:5000/resetpassword/${resetToken}`;
		
		await new Email(user, reseturl).sendPasswordReset();
	
		res.status(200).json({
			status: "success",
			message: "email sent successfully",
		});
	} catch (err) {
		res.status(200).json({
			status: "fail",
			message: err,
		});
	}
};

exports.resetPassword = async (req, res) => {
	try {
	
		
		const user = await User.findOne({
			resettoken: req.params.token
		});
	
		if (user) {
			
			user.password=req.body.password;
			await user.save()
			
			createSendToken(user,200,req,res)
		}
		

		res.status(200).json({
			status: "fail",
			message: "Invalid token",
		});
	} catch (err) {
		res.status(200).json({
			status: "fail",
			message: "some error occured",
		});
	}
};

