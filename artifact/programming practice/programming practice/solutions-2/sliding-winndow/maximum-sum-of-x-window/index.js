const target = [0, 3, 2, -8, 4, 5, 6, 7];
const windowSize = 3;

let left = 0;
let right = 0;
let result = 0;
let currentSum = 0;

while (left < target.length) {
  const currentWindowSize = right - left;

  if (windowSize > currentWindowSize) {
    currentSum += target[right];
    right++;
  } else {
    if (currentSum > result) {
      result = currentSum;
    }
    currentSum -= target[left];
    left++;
  }
}

console.log(result);
