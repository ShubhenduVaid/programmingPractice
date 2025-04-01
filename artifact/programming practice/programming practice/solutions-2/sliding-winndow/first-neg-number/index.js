const target = [12, -1, -7, 8, -15, 30, 16, 28];

const negNumbers = [];

for (let i = 0; i < target.length; i++) {
  const element = target[i];

  if (element < 0) {
    negNumbers.push(element);
  }
}

for (let i = 0; i < target.length; i++) {
  const element = target[i];

  if (negNumbers.length > 0) {
    console.log(negNumbers[0], "<--", target.slice(i, i + 3));
  } else {
    console.log(0, "<--", target.slice(i, i + 3));
  }

  if (element < 0) {
    negNumbers.shift();
  }
}
