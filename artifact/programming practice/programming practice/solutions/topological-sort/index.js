const graph = {
    0: [1, 3],
    1: [2],
    2: [3],
    3: [],
    4: [5, 6],
    5: [6],
    6: [],
}

const visited = {}

const stack = []

function topologicalSort(nodeIndex) {
    if (visited[nodeIndex]) {
        return;
    }

    visited[nodeIndex] = true

    const dependents = graph[nodeIndex]

    for (let i = 0; i < dependents.length; i++) {
        const dependent = dependents[i];
        topologicalSort(dependent)
    }
    stack.unshift(nodeIndex)
}

// i is just the node indexes
for (let i = 0; i < 7; i++) {
    topologicalSort(i)
}

console.log(stack);

// function topologicalSortBFS() {
//     const queue = []
//     const visited = {}
//     const stack = []

//     queue.push(0)
//     visited[0] = true

//     while (queue.length) {
//         const node = queue.shift()

//         const dependents = graph[node]

//         for (let i = 0; i < dependents.length; i++) {
//             const dependent = dependents[i];
//             if (!visited[dependent]) {
//                 queue.push(dependent)
//                 visited[dependent] = true
//             }
//         }
//         stack.unshift(node)
//     }
//     return stack
// }

// console.log(topologicalSortBFS());