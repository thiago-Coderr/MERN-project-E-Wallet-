const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello form server side", app: "E-wallet" });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
