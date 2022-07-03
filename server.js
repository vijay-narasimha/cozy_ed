const dotenv = require("dotenv");
const app = require("./app");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const port = process.env.PORT;

const DB = process.env.DATABASE.replace("<password>", "vijay");
mongoose
	.connect(DB, {
		useNewUrlParser: true,
	})
	.then(() => {
		app.listen(port, () => {
			console.log(`listening at http://localhost:${port}`);
		});
	});
