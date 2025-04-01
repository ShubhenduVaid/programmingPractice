const target = [
    '12041996',
    '20101996',
    '05061997',
    '12041989',
    '11081987',
]

function radix(arr) {
    let result = arr;
    result = countingSort(result, 1000000, 100, 32)
    result = countingSort(result, 10000, 100, 13)
    result = countingSort(result, 1, 10000, 2501)
    return result;
}


function countingSort(arr, exponent, mod, range) {
    const countingArray = new Array(range) // O(n)

    // find the frequency 
    for (let i = 0; i < arr.length; i++) {
        const index = Math.floor((arr[i] / exponent) % mod);
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
        const num = Math.floor((arr[i] / exponent) % mod);
        const index = countingArray[num] - 1
        result[index] = arr[i]
        countingArray[num] = countingArray[num] - 1
    }

    return result
}

console.log(radix(target));