const arr = '3 4 6 2 1 8 9'.split(' ')

let flag = true

let i = 1

while (i < arr.length) {
    if (flag) {
        if (arr[i] > arr[i - 1]) {
            const temp = arr[i]
            arr[i] = arr[i - 1]
            arr[i - 1] = temp
        }
    }
    else {
        if (arr[i] < arr[i - 1]) {
            const temp = arr[i]
            arr[i] = arr[i - 1]
            arr[i - 1] = temp
        }
    }
    flag = !flag
    i++
}

console.log(arr)
