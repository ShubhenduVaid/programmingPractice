const target = [6, 2, 5, 2, 2, 6, 6]

let unique = {}

target.forEach(n => {
    if (unique[n]) {
        unique[n]++
    }
    else
        unique[n] = 1
})

console.log(Object.keys(unique).filter(a => unique[a] === 1))