function substrings(source) {
    if (source.length === 0) {
        return
    }

    let temp = ''
    for (let i = 0; i < source.length; i++) {
        const element = source[i];

        const after = source.slice(i + 1)

        temp = temp + element

        console.log("LOG: substrings -> result", temp)

        substrings(after)
    }
}

substrings('abcde'.split(''), '')