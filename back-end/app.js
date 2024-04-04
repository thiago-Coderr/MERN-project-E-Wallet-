const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config({ path: "./config.env" });

const app = express();
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(cookieParser());

app.use("/auth", userRouter);

mongoose.connect("mongodb://127.0.0.1:27017/authentication");

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
