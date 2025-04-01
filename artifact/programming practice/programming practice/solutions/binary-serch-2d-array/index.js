const target = [
    [1, 2, 3, 4, 5,],
    [6, 7, 8, 9, 10,],
    [11, 12, 13, 14, 15,],
]

function find(arr, num) {
    let start = 0
    let end = (arr.length * arr[0].length) - 1
    const cols = arr[0].length
    while (start < end) {
        let mid = end + start / 2

        let row = Math.floor(mid / cols)
        let col = Math.floor(mid % cols)

        const temp = arr[row][col]

        if (temp === num) {
            console.log(row, col);
            break
        }
        else if (num > temp) {
            start = mid + 1
        }
        else {
            end = mid - 1
        }
    }
}

find(target, 15)