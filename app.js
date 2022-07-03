const express = require("express");
const path = require("path");
const cookieparser = require("cookie-parser");
const viewController = require("./controllers/viewController");

const userRouter = require("./routers/userRouter");
const viewRouter = require("./routers/viewRouter");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use("", viewRouter);
app.use("/api/users", userRouter);
app.all("*", viewController.notfound);

module.exports = app;
