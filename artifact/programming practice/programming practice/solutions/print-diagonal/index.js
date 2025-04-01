const matrix = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
]

// by first column
for (let row = 0; row < matrix.length; row++) {
    let i = row;
    let j = 0
    while (i > -1 && j < matrix[i].length - 1) {
        console.log(matrix[i][j])
        i--
        j++
    }
    console.log('------')
}

// by last row
for (let column = 1; column < matrix[matrix.length - 1].length; column++) {
    let col = column
    let row = matrix.length - 1;

    while (row > -1 && col < matrix[row].length) {
        console.log(matrix[row][col])
        col++
        row--
    }
    console.log('------')
}