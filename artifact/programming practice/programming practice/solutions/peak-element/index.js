const target = [5, 10, 15, 25, 30, 45, 65, 50, 35, 1]

let found = false

let start = 0
let end = target.length - 1

while (!found) {
    let mid = Math.floor((start + end) / 2)

    let value = target[mid]
    let leftValue = target[mid - 1] ? target[mid - 1] : 0
    let rightValue = target[mid + 1] ? target[mid + 1] : 0

    if (value > leftValue && value > rightValue) {
        found = true
        console.log(value)
    }
    else {
        if (leftValue > value) {
            end = mid - 1;
        }
        else {
            start = mid + 1
        }
    }
}