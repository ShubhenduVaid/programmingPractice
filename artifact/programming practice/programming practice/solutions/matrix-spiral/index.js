const matrix = [
    [11, 12, 13, 14, 15, 16, 17],
    [21, 22, 23, 24, 25, 26, 27],
    [31, 32, 33, 34, 35, 36, 37],
    [41, 42, 43, 44, 45, 46, 47],
    [51, 52, 53, 54, 55, 56, 57],
]

let maxRow = matrix.length - 1
let maxCol = matrix[0].length - 1
let minRow = 0
let minCol = 0
let count = 0;
let max = matrix.length * matrix[0].length

const result = []

while (count < max) {
    // left to right
    for (let i = minCol; i <= maxCol && count < max; i++) {
        result.push(matrix[minRow][i]);
        count++
    }
    minRow++

    // top to bottom
    for (let i = minRow; i <= maxRow && count < max; i++) {
        result.push(matrix[i][maxCol]);
        count++
    }
    maxCol--

    // right to left
    for (let i = maxCol; i >= minCol && count < max; i--) {
        result.push(matrix[maxRow][i]);
        count++
    }
    maxRow--

    // bottom to top
    for (let i = maxRow; i >= minRow && count < max; i--) {
        result.push(matrix[i][minCol]);
        count++
    }
    minCol++
}

console.log("LOG: result", result)