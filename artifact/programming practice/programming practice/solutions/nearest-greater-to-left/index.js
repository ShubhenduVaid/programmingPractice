const input = [100, 80, 60, 75, 85]

const result = []
const stack = []

for (let i = 0; i < input.length; i++) {
    const num = input[i];

    while (stack.length > 0 && num > stack[stack.length - 1]) {
        stack.pop()
    }

    result.push(stack.length === 0 ? -1 : stack[stack.length - 1])

    stack.push(num)
}

console.log(result);