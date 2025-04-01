function Node(v, l, r) {
    this.v = v;
    this.l = l;
    this.r = r
}

function arrayToBST(arr, start, end) {
    if (start > end) {
        return null
    }

    const mid = Math.floor((start + end) / 2)

    const first = arrayToBST(arr, start, mid - 1)
    const midValue = arr[mid]
    const last = arrayToBST(arr, mid + 1, end)

    return new Node(midValue, first, last)
}

console.log(JSON.stringify(arrayToBST([11, 22, 33, 44, 55, 66, 77, 88, 99], 0, 8), null, 2));