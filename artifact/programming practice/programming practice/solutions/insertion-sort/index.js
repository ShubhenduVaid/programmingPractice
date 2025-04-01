const target = [29, 10, 14, 37, 13]

let i = 1;

while (i < target.length) {
    let j = i
    while (j > 0) {
        if (target[j - 1] > target[j]) {
            const temp = target[j]
            target[j] = target[j - 1]
            target[j - 1] = temp;
        }
        else {
            break
        }
        j--
    }

    i++
}

console.log(target);