const grid = [
    [1, 1, 0, 1,],
    [1, 1, 1, 1,],
    [0, 0, 0, 1,],
    [1, 0, 0, 1,],
];

function islandSize(target, columnIndex, rowIndex) {
    const stack = [[columnIndex, rowIndex]]
    let count = 0;
    while (stack.length) {
        const [col, row] = stack.pop()

        if (col >= target[0].length || col < 0) {
            continue;
        }
        if (row >= target.length || row < 0) {
            continue;
        }
        if (grid[row][col] !== 1) {
            continue;
        }

        count++
        console.log(row, col, count);

        grid[row][col] = 2

        stack.push([col + 1, row])
        stack.push([col - 1, row])
        stack.push([col, row - 1])
        stack.push([col, row + 1])
    }
    return count
}

let max = 0
for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
        max = Math.max(islandSize(grid, x, y), max)
    }
}

console.log("LOG: max", max)