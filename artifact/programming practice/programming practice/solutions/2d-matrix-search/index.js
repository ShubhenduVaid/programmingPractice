const matrix = [
    [2, 6, 7, 11],
    [3, 8, 10, 12],
    [4, 9, 11, 13],
    [5, 15, 16, 18]
]

let x = matrix.length - 1
let y = 0

let target = 5

while (y < matrix.length && x >= 0) {
    const element = matrix[y][x];
    console.log("LOG: element", element)
    if (element === target) {
        console.log('found', y, x);
        break
    }

    if (element > target) {
        x--
    }
    else {
        y++
    }
}