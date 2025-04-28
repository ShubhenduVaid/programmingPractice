const {
  randomiseBetweenTwoValues,
  randomiseRejectionPercentage,
} = require("../utils/random");

const task = function (taskId, duration, rejectionPercentage) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (randomiseRejectionPercentage(rejectionPercentage)) {
        return resolve({ taskId, status: "success", duration });
      }
      return reject({ taskId, status: "error", duration });
    }, duration);
  });
};

const taskCreation = async function (taskId, maxRetries = 2) {
  try {
    return await task(taskId, randomiseBetweenTwoValues(500, 3000), 40);
  } catch (error) {
    console.log(error);
    console.log("Retrying");
    return await task(taskId, randomiseBetweenTwoValues(500, 3000), 40);
  }
};

module.exports = { taskCreation };
