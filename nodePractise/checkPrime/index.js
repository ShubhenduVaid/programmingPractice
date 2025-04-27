const express = require("express");
const cors = require("cors");
const isPrime = require("./checkPrime");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ response: null });
});

app.post("/", (req, res) => {
  const { number } = req.body;

  res.json({ response: { number, prime: isPrime(number) } });
});

app.listen(port, () => {
  console.log("App running on port", port);
});
