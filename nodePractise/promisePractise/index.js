const express = require("express");
const cors = require("cors");

const { taskCreation } = require("./task/task");
const { polling } = require("./polling");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  let taskResult;
  try {
    taskResult = await taskCreation("task-001");
    console.log("taskResult", taskResult);
  } catch (error) {
    console.error(error);
  }

  res.json({
    status: "200",
    response: { message: taskResult },
  });
});

app.get("/polling", async (req, res) => {
  polling();
});

app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}`);
});
