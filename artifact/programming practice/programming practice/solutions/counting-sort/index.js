const target = [9, 6, 3, 5, 3, 4, 3, 9, 4, 6, 5, 8, 9, 9]

function countingSort(arr) {
    const min = Math.min(...arr) // O(n)
    const max = Math.max(...arr) // O(n)

    const countingArray = new Array(max - min + 1) // O(n)

    // find the frequency 
    for (let i = 0; i < arr.length; i++) {
        const num = arr[i];

        const index = num - min
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
        const num = arr[i];

        const index = countingArray[num - min] - 1
        result[index] = num
        countingArray[num - min] = countingArray[num - min] - 1
    }

    return result
}

console.log(countingSort(target));