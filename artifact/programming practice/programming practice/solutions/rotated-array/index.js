const rotatedArray = [5, 6, 7, 8, 9, 10, 1, 2, 3, 4];

let start = 0
let end = rotatedArray.length - 1

while (start <= end) {
    const mid = Math.floor(start + ((end - start) / 2))

    if (rotatedArray[mid] < rotatedArray[mid - 1]) {
        console.log(mid, rotatedArray[mid])
        break
    }
    else if (rotatedArray[0] > rotatedArray[mid]) {
        end = mid - 1
    }
    else {
        start = mid + 1
    }
}