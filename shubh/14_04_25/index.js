// Array

function arrayValidation(array) {
  return !Array.isArray(array) || array.length < 1;
}

function squareArray(array) {
  if (arrayValidation(array)) {
    return [];
  }
  return array.map((item) => item * item);
}

console.log(squareArray([1, 2, 3]));

function filterByLength(array, length) {
  if (arrayValidation(array)) {
    return [];
  }
  return array.filter((item) => item.length > length);
}

console.log(filterByLength(["cat", "elephant", "dog", "hippopotamus"], 3));

function findOldest(array) {
  if (arrayValidation(array)) {
    return "";
  }
  let oldest = array[0];
  array.map((item) => {
    if (item.age > oldest.age) {
      oldest = item;
    }
  });
  return oldest.name;
}

console.log(
  findOldest([
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 20 },
  ])
);

function sumOfEven(array) {
  if (arrayValidation(array)) {
    return 0;
  }
  return array
    .filter((item) => item % 2 === 0)
    .reduce((count, item) => {
      count += item;
      return count;
    }, 0);
}

console.log(sumOfEven([1, 2, 3, 4, 5, 6]));

function commonElementsInArray(array1, array2) {
  if (arrayValidation(array1) && arrayValidation(array2)) {
    return [];
  }

  let obj1 = {};
  let obj2 = {};
  let finalArr = [];

  array1.forEach((element) => (obj1[element] = element));
  array2.forEach((element) => (obj2[element] = element));

  Object.values(obj1).forEach((elem) => {
    if (obj2[elem]) {
      finalArr.push(elem);
    }
  });

  return finalArr;
}

console.log(commonElementsInArray([1, 2, 3, 4], [2, 4, 6, 8]));

function removeDuplicates(array) {
  if (arrayValidation(array)) {
    return [];
  }
  let obj = {};
  array.forEach((element) => (obj[element] = element));
  return Object.values(obj);
}

console.log(removeDuplicates([1, 2, 2, 3, 3, 4]));

function removeItemByIndex(array, index) {
  if (arrayValidation(array)) {
    return [];
  }
  return array.filter((item, _index) => _index != index);
}

console.log(removeItemByIndex([1, 2, 3, 4, 5], 2));

function findLongestString(array) {
  if (arrayValidation(array)) {
    return [];
  }
  return array.reduce((item, maxObj) => {
    if (item.length > maxObj.length) {
      maxObj = { length: item.length, item: item };
    }
    return maxObj;
  }, "").item.item;
}

console.log(findLongestString(["cat", "elephant", "dog", "rat"]));

function flattenArray(array) {
  if (arrayValidation(array)) {
    return [];
  }
  return array.flat().flat();
}

console.log(flattenArray([1, [2, 3], [4, [5, 6]]]));

function concatArray(array) {
  if (arrayValidation(array)) {
    return [];
  }
  return array.flat();
}

console.log(
  concatArray([
    [1, 2],
    [3, 4],
    [5, 6],
  ])
);
