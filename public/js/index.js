const { default: axios } = require("axios");

const formLogin = document.querySelector("#form--login");

const formSignup = document.querySelector("#form--signup");
const forgotemail = document.querySelector("#form--forgotemail");
const forgotpassword = document.querySelector("#form--forgotpassword");
const hideAlert = () => {
	const el = document.querySelector(".alert");
	if (el) el.parentElement.removeChild(el);
};

const showAlert = (type, msg) => {
	hideAlert();
	const markup = `<div class='alert alert--${type}'>${msg}</div>`;
	document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
	window.setTimeout(hideAlert, 5000);
};

const localURL='http://localhost:5000';
const URL='https://cozyed.herokuapp.com';
const login = async (email, password) => {
	try {
		const res = await axios({
			method: "POST",
			url: "/api/users/login",
			data: {
				email,
				password,
			},
		});

		if (res.data.status === "success") {
			showAlert("success", "Login successful");
			window.setTimeout(() => {
				location.assign("/");
			});
		} else {
			showAlert("error", res.data.message);
		}
	} catch (err) {
		showAlert("error", err.data.message);
	}
};

const signup = async (name, email, password) => {
	try {
		console.log(name,email,password)
		const res = await axios({
			method: "POST",
			url: "/api/users/signup",
			data: {
				name,
				email,
				password,
			},
		});
		if (res.data.status === "success") {
			showAlert("success", "signup successful");
			window.setTimeout(() => {
				location.assign("/");
			});
		} else {
			showAlert("error", res.data.message);
		}
	} catch (err) {
		showAlert("error", "errors occured");
	}
};

const sendemail = async (email) => {
	try {
		const res = await axios({
			method: "POST",
			url: "/api/users/forgotpassword",
			data: {
				email,
			},
		});

		if (res.data.status === "success") {
			showAlert("success", res.data.message);
		} else {
			showAlert("error", "check your email");
		}
	} catch (err) {
		showAlert("error", "error occured");
	}
};

if (formLogin) {
	formLogin.addEventListener("submit", (e) => {
		e.preventDefault();
		const email = document.querySelector("#email").value;
		const password = document.querySelector("#password").value;

		login(email, password);
	});
}

if (formSignup) {
	formSignup.addEventListener("submit", (e) => {
		e.preventDefault();
		const name = document.querySelector("#name").value;
		const email = document.querySelector("#email").value;
		const password = document.querySelector("#password").value;
		const confirmpassword = document.querySelector("#confirmpassword");
console.log(name,email,password);
		signup(name, email, password);
	});
}
if (forgotemail) {
	forgotemail.addEventListener("submit", (e) => {
		e.preventDefault();
		const email = document.querySelector("#email").value;
		sendemail(email);
	});
}

const contact = document.querySelector(".contact");
if (contact) {
	contact.addEventListener("submit", (e) => {
		e.preventDefault();
		const name = document.querySelector(".contact-name").value;
		const message = document.querySelector(".contact-message").value;

		emailjs.send("service_repwuld", "template_w44xita", {
			user: name,
			message,
		});
		showAlert("success", "mail sent successfully");
		document.querySelector(".contact-name").value = "";
		document.querySelector(".contact-message").value = "";
	});
}

const passwordreset = async (password, token) => {
	try {
		console.log("passwod", password);
		const res = await axios({
			method: "POST",
			url: `/api/users/resetpassword/${token}`,
			data: {
				password,
			},
		});
		console.log(res);
		if (res.data.status === "success") {
			console.log("checking");
		} else {
			showAlert("error", "reset password failed");
		}
	} catch (err) {
		showAlert("error", "error occured");
	}
};

const resetpassword = document.querySelector("#form--forgotpassword");
if (resetpassword) {
	resetpassword.addEventListener("submit", (e) => {
		e.preventDefault();
		const password = document.querySelector("#password").value;
		const confirmpassword = document.querySelector("#confirmpassword").value;
		const token = document.querySelector(".resettoken").innerHTML;
		if (password === confirmpassword) {
			passwordreset(password, token);
		} else {
			showAlert("error", "password doesn't match");
		}
	});
}
const logoutbtn = document.querySelector(".logoutbtn");
if (logoutbtn) {
	logoutbtn.addEventListener("click", async () => {
		try {
			console.log("clicked");
			const res = await axios({
				method: "GET",
				url: localURL+`/api/users/logout`,
			});
			if (res.data.status === "success") {
				showAlert("success", "logout successful");
				location.reload(true);
			}
		} catch (err) {
			showAlert("error", "error happened");
		}
	});
}

window.onscroll = function() {scrollFunction()};
 
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    
    document.getElementById("navbar").style.background = "#501e27";
  } else {
   
    document.getElementById("navbar").style.background = "none";
  }
} 


