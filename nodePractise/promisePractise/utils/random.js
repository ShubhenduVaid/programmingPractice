const randomiseRejectionPercentage = function (rejectionPercentage) {
  if (Math.random() <= rejectionPercentage / 100) {
    return false;
  }
  return true;
};

const randomiseBetweenTwoValues = function (start = 500, end = 3000) {
  return Math.floor(Math.random() * (end - start + 1) + start);
};

module.exports = { randomiseRejectionPercentage, randomiseBetweenTwoValues };
