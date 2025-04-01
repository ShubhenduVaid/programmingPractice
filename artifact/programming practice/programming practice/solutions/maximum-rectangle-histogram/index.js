const histogram = [6, 2, 5, 4, 5, 1, 6]

function smallerNearestToRight(input) {
    const result = []
    const stack = []

    for (let i = input.length - 1; i > -1; i--) {
        const num = input[i];

        while (stack.length > 0 && num < (stack[stack.length - 1].num || -Infinity)) {
            stack.pop()
        }

        result.unshift(stack.length === 0 ?
            // none is smaller than this on right
            { num: -1, i: input.length } :
            // smaller found
            stack[stack.length - 1])

        stack.push({ num, i })
    }
    return result
}

function smallerNearestToLeft(input) {
    const result = []
    const stack = []

    for (let i = 0; i < input.length; i++) {
        const num = input[i];

        while (stack.length > 0 && num < (stack[stack.length - 1].num || -Infinity)) {
            stack.pop()
        }

        result.push(stack.length === 0 ?
            // none is smaller than this on right
            { num: -1, i: -1 } :
            // smaller found
            stack[stack.length - 1])

        stack.push({ num, i })
    }
    return result
}

const right = smallerNearestToRight(histogram)
const left = smallerNearestToLeft(histogram)

const histogramAreas = []
for (let i = 0; i < histogram.length; i++) {
    const nearestLeft = left[i];
    const nearestRight = right[i]

    const width = nearestRight.i - nearestLeft.i - 1

    histogramAreas[i] = width * histogram[i]
}

const result = Math.max(...histogramAreas)
console.log("LOG: result", result)