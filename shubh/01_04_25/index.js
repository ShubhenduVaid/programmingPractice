// Calculate the Sum of Two Numbers

// Write a function that takes two numbers as arguments and returns their sum.

function sum(a, b) {
  return a + b;
}

// Find the Maximum Number in an Array

// Create a function that accepts an array of numbers and returns the largest number.

//O(n log n)
// function findMaxInArray(arr) {
//   return arr.sort((a, b) => a - b)[arr.length - 1];
// }

// O(n)
function findMaxInArray(arr) {
  let max = arr[0];
  arr.forEach((item) => {
    if (item > max) max = item;
  });
  return max;
}

// O(n)
// function palindrome(str) {
//   str = str.toLowerCase().split(" ").join("");
//   return str === str.split("").reverse().join("");
// }

function palindrome(str) {
  str = str.toLowerCase().split(" ").join("");
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) return false;

    left++;
    right--;
  }
  return true;
}

//O(n)
// function reverseStr(str) {
//   return str.split("").reverse().join("");
// }

function reverseStr(str) {
  let temp = "";
  for (let index = str.length - 1; index >= 0; index--) {
    temp += str.charAt(index);
  }
  return temp;
}

//
function fizzBuzz(num) {
  let str = "";
  for (let index = 1; index <= num; index++) {
    let isFizz = index % 3 === 0;
    let isBuzz = index % 5 === 0;
    let isFizzBuzz = index % 3 === 0 && index % 5 === 0;

    if (isFizzBuzz) {
      str += "FizzBuzz, ";
    } else if (isFizz) {
      str += "Fizz, ";
    } else if (isBuzz) {
      str += "Buzz, ";
    } else {
      str += index + ", ";
    }
  }
  return str;
}

//
function sumOfTwoNumbers(array, target) {
  let pair = [];
  let map = {};
  array.map((elem, index) => {
    map[elem] = index;
  });
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    let noToFind = target - element;
    if (map[noToFind]) {
      pair.push(index);
      pair.push(map[noToFind]);
      break;
    }
  }
  return pair;
}

// Call sum
console.log(sum(5, -6));
// Call maxinarr
console.log(findMaxInArray([2, 75, 8, 1, 0, 7, 9, 3, -77]));
// Call palindrome
console.log(palindrome("deified"));
console.log(palindrome("Yo, Banana Boy"));
console.log(palindrome("No lemon, no melon"));
// Call string reversal
console.log(reverseStr("Hello there 1234 !"));
// Call FizzBuzz
console.log(fizzBuzz(15));
// Call Sumof2Nos
console.log(sumOfTwoNumbers([2, 7, 11, 15], 9));
