const isPrime = function (number) {
  if (isNaN(number)) return false;
  if (number < 1) return false;
  for (let index = 2; index < number; index++) {
    if (number % index === 0) return false;
  }
  return true;
};
module.exports = isPrime;
