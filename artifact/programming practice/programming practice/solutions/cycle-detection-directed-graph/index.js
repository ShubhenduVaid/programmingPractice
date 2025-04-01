const graph = {
    0: [1, 3],
    1: [2],
    2: [3],
    3: [],
    4: [5, 6],
    5: [6],
    6: [5],
}

const visited = {}

function traverse(nodeIndex) {
    if (visited[nodeIndex]) {
        console.log("LOG: traverse -> nodeIndex", nodeIndex)
        return;
    }

    visited[nodeIndex] = true

    const dependents = graph[nodeIndex]

    for (let i = 0; i < dependents.length; i++) {
        const dependent = dependents[i];
        traverse(dependent)
    }
    visited[nodeIndex] = false
}

// i is just the node indexes
for (let i = 0; i < Object.keys(graph).length; i++) {
    traverse(i)
}