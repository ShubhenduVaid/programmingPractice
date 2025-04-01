function Node(next, value) {
    this.value = value;
    this.next = next;
}

const node10 = new Node(null, 10)
const node9 = new Node(node10, 9)
const node8 = new Node(node9, 8)
const node7 = new Node(node8, 7)
const node6 = new Node(node7, 6)
const node5 = new Node(node6, 5)
const node4 = new Node(node5, 4)
const node3 = new Node(node4, 3)
const node2 = new Node(node3, 2)
const node1 = new Node(node2, 1)

function print(node) {
    while (node) {
        console.log(node.value);
        node = node.next
    }
}

print(node1)

// RECURSION
// function reverse(node) {
//     if (!node.next) {
//         return node
//     }

//     const result = reverse(node.next)
//     result.next = node
//     node.next = null

//     return node
// }

// ITERATION 
function reverse(node) {
    let previous = null;
    while (node) {
        const next = node.next
        node.next = previous
        previous = node
        node = next
    }
}

reverse(node1)

print(node10)
