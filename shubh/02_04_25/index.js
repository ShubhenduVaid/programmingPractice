// Array

// 1. Reverse an Array
// Description: Reverse an array without using the built-in reverse() method.
// Example: [1, 2, 3, 4] → [4, 3, 2, 1]
// Optimum Time Complexity: O(n) - Linear time, where n is the array length.

function arrayReverse(array) {
  if (!Array.isArray(array)) return [];
  let tempArr = [];
  for (let index = array.length - 1; index >= 0; index--) {
    const element = array[index];
    tempArr.push(element);
  }
  return tempArr;
}

// console.log(arrayReverse([1, 2, 3, 4]));
// console.log(arrayReverse("hello"));
// console.log(arrayReverse([null, undefined]));

// 2. Find the Maximum and Minimum
// Description: Find the max and min values in an array without using Math.max() or Math.min().
// Example: [3, 1, 4, 1, 5] → { max: 5, min: 1 }
// Optimum Time Complexity: O(n) - Single pass through the array.

function findMaxAndMinArr(array) {
  let tempObj = { max: undefined, min: undefined };
  if (!Array.isArray(array)) return tempObj;

  if (array.length > 0) {
    let max = array[0];
    let min = array[0];
    array.forEach((elem) => {
      if (elem > max) {
        max = elem;
      }
      if (elem < min) {
        min = elem;
      }
    });
    tempObj["max"] = max;
    tempObj["min"] = min;
  }

  return tempObj;
}

// console.log(findMaxAndMinArr([3, 1, 4, 1, 5]));
// console.log(findMaxAndMinArr([]));

// 3. Remove Duplicates
// Description: Remove duplicates from an array without using Set.
// Example: [1, 2, 2, 3, 4, 4, 5] → [1, 2, 3, 4, 5]
// Optimum Time Complexity: O(n) - Using a hash table for tracking uniques.

function removeDuplicatesArr(array) {
  let tempObj = {};
  let finalArr = [];
  if (!Array.isArray(array)) return finalArr;

  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (!tempObj[element]) {
      tempObj[element] = element;
      finalArr.push(element);
    }
  }
  return finalArr;
}

// console.log(removeDuplicatesArr([1, 2, 2, 3, 4, 4, 5]));

// 4. Rotate an Array
// Description: Rotate an array to the right by k steps.
// Example: [1, 2, 3, 4, 5], k = 2 → [4, 5, 1, 2, 3]
// Optimum Time Complexity: O(n) - Using a reversal algorithm.

function rotateArr(array, steps) {
  if (!Array.isArray(array) || array.length === 0) return [];
  let tempArr = [...array];
  if (steps < 0) {
    for (let index = 0; index < steps; index++) {
      tempArr.shift(tempArr.pop());
    }
  } else {
    for (let index = 0; index < steps; index++) {
      tempArr.unshift(tempArr.pop());
    }
  }

  return tempArr;
}

// function rotateArr(array, steps) {
//   let tempArr = [];
//   if (!Array.isArray(array)) return tempArr;

//   for (let index = steps + 1; index < array.length; index++) {
//     tempArr.push(array[index]);
//   }
//   for (let index = 0; index < steps + 1; index++) {
//     tempArr.push(array[index]);
//   }
//   return tempArr;
// }

console.log(rotateArr([1, 2, 3, 4, 5], 2));
