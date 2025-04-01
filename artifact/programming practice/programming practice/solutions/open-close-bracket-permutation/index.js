function openCloseBracketPermutation(open, close, str) {
    if (open === 0 && close === 0) {
        console.log(str);
        return
    }

    if (close > open) {
        openCloseBracketPermutation(open, close - 1, str + ')')
    }

    if (open >= 0)
        openCloseBracketPermutation(open - 1, close, str + '(')
}

openCloseBracketPermutation(3, 3, '')