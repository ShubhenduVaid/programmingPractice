const s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"

const target = s.split('')

const hash = {}

let sequence = s.slice(0, 10)
hash[sequence] = (hash[sequence] || 0) + 1

const result = []
for (let i = 10; i < target.length; i++) {
    const char = target[i]
    sequence = `${sequence}${char}`
    sequence = sequence.slice(1)

    hash[sequence] = (hash[sequence] || 0) + 1

    if (hash[sequence] === 2) {
        result.push(sequence)
    }
}


