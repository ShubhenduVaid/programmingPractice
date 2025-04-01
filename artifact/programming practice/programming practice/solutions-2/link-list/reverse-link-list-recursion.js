function Node(value, next) {
    this.next = next
    this.value = value;
}

const list = new Node(
    1,
    new Node(
        2,
        new Node(
            3,
            new Node(
                4
            )
        )
    )
)

function reverse(head) {
    if (!head || !head.next) {
        return head
    }

    const newHead = reverse(head.next)

    const next = head.next;

    next.next = head;

    head.next = null

    return newHead;
}

const reversedList = reverse(list)
console.log("LOG: reversedList", reversedList)
