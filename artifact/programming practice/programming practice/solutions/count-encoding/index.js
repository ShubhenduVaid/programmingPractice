const target = "123".split('')
const charNumMap = {
    1: 'a',
    2: 'b',
    3: 'c',
    4: 'd',
    5: 'e',
    6: 'f',
    7: 'g',
    8: 'h',
    9: 'i',
    10: 'j',
    11: 'k',
    12: 'l',
    13: 'm',
    14: 'n',
    15: 'o',
    16: 'p',
    17: 'q',
    18: 'r',
    19: 's',
    20: 't',
    21: 'u',
    22: 'v',
    23: 'w',
    24: 'x',
    25: 'y',
    26: 'z',
}



function countEncodings(arr, x, y, cache) {
    if (x >= arr.length) {
        return 1
    }

    if (cache[`${x} ${y}`]) {
        return cache[`${x} ${y}`]
    }

    let result = 0

    const single = charNumMap[arr[x]]

    if (single) {
        result += countEncodings(arr, x + 1, y + 1, cache)
        cache[`${x + 1} ${y + 1}`] = result
    }

    const double = charNumMap['' + arr[x] + arr[y]]
    if (double) {
        result += countEncodings(arr, x + 2, y + 2, cache)
        cache[`${x + 2} ${y + 2}`] = result
    }

    return result;
}

console.log(countEncodings(target, 0, 1, {}));