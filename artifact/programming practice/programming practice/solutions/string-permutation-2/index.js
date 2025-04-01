function permutation(source, result) {
    if (source.length === 0) {
        return
    }

    for (let i = 0; i < source.length; i++) {
        const element = source[i];

        const before = source.slice(0, i)
        const after = source.slice(i + 1)

        const temp = result + element

        console.log("LOG: permutation -> result", temp)

        permutation([...before, ...after], temp)
    }
}

permutation('abc'.split(''), '')