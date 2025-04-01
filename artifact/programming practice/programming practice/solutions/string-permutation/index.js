function permutation(source, result) {
    if (source.length === 0) {
        console.log(result.join())
        return
    }

    for (let i = 0; i < source.length; i++) {
        const element = source[i];

        const before = source.slice(0, i)
        const after = source.slice(i + 1)

        const temp = [...result, element]
        permutation([...before, ...after], temp)
    }

}

permutation('abc'.split(''), []);