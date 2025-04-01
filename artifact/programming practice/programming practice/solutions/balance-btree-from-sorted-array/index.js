const target = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function Node(l, r, v) {
    this.left = l;
    this.right = r;
    this.value = v
}

function createBTree(arr) {
    if (arr.length < 2) {
        return
    }
    const midIndex = Math.floor(arr.length / 2);
    const midValue = arr[midIndex]

    const leftTree = createBTree(arr.slice(0, midIndex))
    const rightTree = createBTree(arr.slice(midIndex))

    const node = new Node(leftTree, rightTree, midValue)
    return node;
}

console.log(JSON.stringify(createBTree(target), null, 2));