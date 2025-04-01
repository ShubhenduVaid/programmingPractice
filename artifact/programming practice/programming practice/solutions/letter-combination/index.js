const t9Mapping = {
    2: ['a', 'b', 'c'],
    3: ['d', 'e', 'f'],
    4: ['g', 'h', 'i'],
    5: ['j', 'k', 'l'],
    6: ['m', 'n', 'o'],
    7: ['p', 'q', 'r', 's'],
    8: ['t', 'u', 'v'],
    9: ['w', 'x', 'y', 'z']
}

const output = []

function getCombinations(charLists, result) {
    if (charLists.length === 0) {
        output.push(result)
        return result
    }

    const charList = charLists[0]

    for (let i = 0; i < charList.length; i++) {
        getCombinations(charLists.slice(1), result + charList[i])
    }
}

getCombinations([].map(key => t9Mapping[key]), '')

console.log(output);