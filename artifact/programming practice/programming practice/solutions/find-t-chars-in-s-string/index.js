const t = 'aabc'
const s = 'aaabbbcccabc' //aaabbbcccabc

const requiredMapOfChar = {}

for (let i = 0; i < t.length; i++) {
    requiredMapOfChar[t[i]] = requiredMapOfChar[t[i]] ? requiredMapOfChar[t[i]] + 1 : 1
}

let i = 0;
let j = -1;

let charFoundCount = 0
const charFoundMap = {}
let result = Infinity

while (j < s.length) {
    if (charFoundCount === Object.keys(requiredMapOfChar).length) {
        const temp = s.slice(i, j + 1);
        console.log("LOG: temp", temp)
        result = Math.min(temp.length, result)

        const chatAtI = s[i]
        if (chatAtI in charFoundMap) {
            charFoundMap[chatAtI]--

            if (charFoundMap[chatAtI] < requiredMapOfChar[chatAtI]) {
                charFoundCount--
            }
        }

        i++
    }
    else {
        j++
        const chatAtJ = s[j]

        if (chatAtJ in requiredMapOfChar) {
            charFoundMap[chatAtJ] = charFoundMap[chatAtJ] ? charFoundMap[chatAtJ] + 1 : 1

            if (requiredMapOfChar[chatAtJ] === charFoundMap[chatAtJ]) {
                charFoundCount++
            }
        }
    }
}

console.log("LOG: result", result)
