// soruce: https://www.youtube.com/watch?v=U_UBg8jenpE
const target = [-6, -2, 0, 2, 4, 7]

let left = 0
let mid = 1
let right = target.length - 1

let result = null

let sum = 0

while (left <= target.length - 3 && result === null) {
    const first = target[left]
    while (mid < right && result === null) {
        const second = target[mid]
        const third = target[right] // 4

        const sumOf3 = (first + second + third)

        if (sumOf3 === sum) {
            result = [first, second, third]
        }
        else {
            if (sumOf3 < sum) {
                mid++
            }
            else {
                right--
            }
        }

    }

    if (result === null) {
        left++
    }
}

console.log(result)