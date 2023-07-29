const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 4000;

dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(
	cors({
		origin: [
			"http://localhost:3000",
		],
		credentials: true,
	})
);


const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected successfully to database");
  } catch (error) {
    console.error("Error occurred while connecting to database:", error.message);
  }
};

connectToDatabase();

app.use("/auth", require("./routers/authRouter"));
app.use("/user", require("./routers/userRouter"));
app.use("/bank", require("./routers/bankRouter"));
app.use("/camps", require("./routers/campRouter"));

app.listen(port, () =>
	console.log(`Server running at http://localhost:${port}`)
);
