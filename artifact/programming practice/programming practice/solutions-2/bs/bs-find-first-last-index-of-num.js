const source = [
  1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 5, 5, 5, 5,
];
const target = 2;

let start = 0;
let end = source.length - 1;

// find the start
while (start < end) {
  const mid = Math.floor((end - start) / 2);
  const current = source[mid];
  if (current === target) {
    if (mid === 0 || source[mid - 1] !== target) {
      console.log("start of " + target + " is " + mid);
      break;
    }
  }

  if (current === target) {
    end = mid - 1;
  } else if (current > target) {
    end = mid - 1;
  } else {
    start = mid + 1;
  }
}

start = 0;
end = source.length - 1;

// find then end of the number
while (start < end) {
  const mid = Math.floor((end + start) / 2);
  const current = source[mid];

  if (current === target) {
    if (mid === target.length - 1 || source[mid + 1] !== target) {
      console.log("end of " + target + " is " + mid);
      break;
    }
  }

  if (current === target) {
    start = mid + 1;
  } else if (current > target) {
    end = mid - 1;
  } else {
    start = mid + 1;
  }
}
