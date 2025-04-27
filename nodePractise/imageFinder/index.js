const express = require("express");
const cors = require("cors");

const nasaImageFinderService = require("./service/nasaImageFinderService");

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  const response = await nasaImageFinderService(req.query.q);
  res.json({
    status: 200,
    response: { query: req.query.q, response },
  });
});

app.listen(PORT, () => {
  console.log("Server running on PORT : ", PORT);
});
