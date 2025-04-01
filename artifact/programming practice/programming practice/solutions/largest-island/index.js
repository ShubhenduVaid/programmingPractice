const grid = [
    [1, 1, 0, 1,],
    [1, 1, 0, 1,],
    [0, 0, 0, 1,],
    [1, 0, 1, 1,],
];

function islandSize(target, x, y, count) {
    if (x >= target[0].length || x < 0) {
        return 0
    }
    if (y >= target.length || y < 0) {
        return 0
    }
    if (grid[y][x] !== 1) {
        return 0
    }

    grid[y][x] = 2
    let sum = 1
    sum += islandSize(target, x - 1, y, count)
    sum += islandSize(target, x + 1, y, count)
    sum += islandSize(target, x, y + 1, count)
    sum += islandSize(target, x, y - 1, count)

    return sum
}

let max = 0
for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
        max = Math.max(islandSize(grid, j, i, 0), max)
    }
}

console.log("LOG: max", max)