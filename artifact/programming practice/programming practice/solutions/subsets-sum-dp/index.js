const target = [4, 2, 7, 1, 3]
const sum = 10

const dp = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

for (let y = 1; y <= target.length; y++) {
    for (let x = 1; x <= sum; x++) {
        const num = target[y - 1]
        const left = x - num;
        if (dp[y - 1][left] === 1 || dp[y - 1][x]) {
            dp[y][x] = 1;
        }
    }

}

console.log(JSON.stringify(dp, null, 2));