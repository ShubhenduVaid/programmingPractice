const Words = {
  FIZZ: "Fizz",
  BUZZ: "Buzz",
  FIZZBUZZ: "Fizz Buzz",
};

const fizzBuzz = function (start, end) {
  const list = [];
  for (let index = start; index <= end; index++) {
    if (index === 0) {
      list.push(0);
    } else if (index % 3 === 0 && index % 5 === 0) {
      list.push(Words.FIZZBUZZ);
    } else if (index % 3 === 0) {
      list.push(Words.FIZZ);
    } else if (index % 5 === 0) {
      list.push(Words.BUZZ);
    } else {
      list.push(index);
    }
  }
  return list;
};

module.exports = fizzBuzz;
