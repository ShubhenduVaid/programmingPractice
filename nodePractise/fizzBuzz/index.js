const express = require("express");
const cors = require("cors");

const fizzBuzz = require("./util/fizzBuzz");

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: 200, response: { message: "Server Init" } });
});

app.post("/", (req, res) => {
  const { start, end } = req.body;
  res.json({ status: 200, response: { message: fizzBuzz(+start, +end) } });
});

app.listen(PORT, () => {
  console.log("Server started at port:", PORT);
});
