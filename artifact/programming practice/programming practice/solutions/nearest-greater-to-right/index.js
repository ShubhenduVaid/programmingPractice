const input = [1, 3, 2, 4, 5, 1]

const result = []
const stack = []

for (let i = input.length - 1; i > -1; i--) {
    const num = input[i];

    while (stack.length > 0 && num > stack[stack.length - 1]) {
        stack.pop()
    }

    result.unshift(stack.length === 0 ? -1 : stack[stack.length - 1])

    stack.push(num)
}

console.log(result);