function Node(next, value) {
    this.next = next
    this.value = value
}

const head = new Node(null, 'f')
const node1 = new Node(head, 'e')
const node2 = new Node(node1, 'd')
const node3 = new Node(node2, 'c')
const node4 = new Node(node3, 'b')
const node5 = new Node(node4, 'a')

function findMidNode(node) {
    let slow = node
    let fast = node

    while (fast.next && fast.next.next) {
        slow = slow.next
        fast = fast.next.next
    }

    return slow
}

console.log(findMidNode(node5).value)
console.log(findMidNode(node4).value)