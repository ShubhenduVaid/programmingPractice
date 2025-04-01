const matrix = [
    [01, 02, 03, 04, 05],
    [06, 07, 08, 09, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25]
]

// transpose 
for (let i = 0; i < matrix.length; i++) {
    for (let j = i; j < matrix.length; j++) {
        const swap = matrix[i][j]
        matrix[i][j] = matrix[j][i]
        matrix[j][i] = swap
    }
}

// [
//     [01, 06, 11, 16, 21],
//     [02, 07, 12, 17, 22],
//     [03, 08, 13, 18, 23],
//     [04, 09, 14, 19, 24],
//     [05, 10, 15, 20, 25]
// ]

// reverse columns
for (let i = 0; i < matrix.length; i++) {
    let left = 0;
    let right = matrix.length - 1
    while (left < right) {
        const swap = matrix[i][left]
        matrix[i][left] = matrix[i][right]
        matrix[i][right] = swap
        left++
        right--
    }
}

console.log(matrix);

/** OUTPUT
[
  [ 21, 16, 11, 6, 1 ],
  [ 22, 17, 12, 7, 2 ],
  [ 23, 18, 13, 8, 3 ],
  [ 24, 19, 14, 9, 4 ],
  [ 25, 20, 15, 10, 5 ]
]
 */
