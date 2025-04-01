const target = [98, 23, 5, 12, 7, 27]

const stack = []

for (let i = 0; i < target.length; i++) {
    const num = target[i];

    if ((stack[stack.length - 1] || Infinity) > num) {
        stack.push(num)
    }
    else {
        while (stack[stack.length - 1] < num) {
            const popped = stack.pop()
            console.log('next largest for ', popped, ' is ', num)
        }
        stack.push(num)
    }
}

while (stack.length) {
    console.log('next greater for ', stack.pop(), ' is null')
}