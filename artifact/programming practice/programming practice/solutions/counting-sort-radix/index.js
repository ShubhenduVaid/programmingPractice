const target = [213, 97, 718, 123, 37, 443, 982, 64, 375, 683]

function radix(arr) {
    const max = Math.max(...target)
    let result = arr;
    let exponent = 10
    while (max >= exponent) {
        result = countingSort(result, exponent)
        exponent = exponent * 10
    }
    return result;
}


function countingSort(arr, exponent) {
    const countingArray = new Array(10) // O(n)

    // find the frequency 
    for (let i = 0; i < arr.length; i++) {
        const num = Math.floor((arr[i] / exponent) % 10);
        console.log("LOG: countingSort -> num", num)

        const index = num
        countingArray[index] = countingArray[index] ? countingArray[index] + 1 : 1
    }

    // convert the frequency to destination indexes
    for (let i = 0; i < countingArray.length; i++) {
        countingArray[i] = (countingArray[i] || 0) + (countingArray[i - 1] || 0);
    }

    // this will contain the sorted array
    const result = new Array(arr.length) // O(n)

    // place nums at right positions
    for (let i = arr.length - 1; i > -1; i--) {
        const num = Math.floor((arr[i] / exponent) % 10);

        const index = countingArray[num] - 1
        result[index] = arr[i]
        countingArray[num] = countingArray[num] - 1
    }

    return result
}

console.log(radix(target));