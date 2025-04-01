const weights = [1, 2, 3]

const totalSum = weights.reduce((total, current) => total + current, 0)

const random = Math.floor(Math.random() * (totalSum + 1));
console.log("LOG: random", random)

let start = 0
let end = weights.length - 1

while (start < end) {
    const mid = Math.floor((end - start) / 2)
    if (weights[mid] < random) {
        start = mid + 1
    }
    else {
        end = mid
    }
}


console.log(weights[start]);