const target = 'ababcabcabababd'.split('')
const pattern = 'ababd'.split('')

function buildPatternTable(word) {
    let table = [0]
    let i = 0;
    let j = 1;
    while (j < word.length) {
        if (word[i] === word[j]) {
            i++
            table[j] = i
            j++
        }
        else if (i === 0) {
            table[j] = 0
            j++
        }
        else {
            i = table[i - 1]
        }
    }
    return table
}

const patternTable = buildPatternTable(pattern)
console.log("LOG: patternTable", patternTable)

let i = 0
let j = 0

while (j < target.length) {


    if (target[j] === pattern[i]) {
        j++
        i++
    }
    else if (i === 0) {
        j++
    }
    else {
        i = patternTable[i - 1]
    }

    if (i === pattern.length) {
        console.log('pattern found at ', j - pattern.length);
        break
    }
}
