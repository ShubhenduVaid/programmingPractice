const target = [5, 2, 1, 3, 4, 6, 7, 9, 8, 3]

// contains sum of ranges
const segmentTree = [] // looks like [sum, start, end]

// create the segment tree
function createSegmentTree(start, end, destinationIndex) {
    if (start === end) {
        segmentTree[destinationIndex] = [target[start], start, end]
        return target[start]
    }

    const mid = Math.floor((start + end) / 2)

    const left = createSegmentTree(start, mid, (destinationIndex * 2) + 1)
    const right = createSegmentTree(mid + 1, end, (destinationIndex * 2) + 2)
    const sum = left + right

    segmentTree[destinationIndex] = [sum, start, end]

    return sum
}

createSegmentTree(0, target.length - 1, 0)
// console.log("segment tree is created", segmentTree)

// find the sum of a range
function sumOfRange(qStart, qEnd, destinationIndex = 0) {
    const [sum, start, end] = segmentTree[destinationIndex]

    // query range contains the stand and end
    if (qStart <= start && qEnd >= end) {
        return sum
    }
    // query range start is greater then end
    else if (qStart > end) {
        return 0;
    }
    // query range end is less than start
    else if (qEnd < start) {
        return 0;
    }

    const left = sumOfRange(qStart, qEnd, (destinationIndex * 2) + 1)
    const right = sumOfRange(qStart, qEnd, (destinationIndex * 2) + 2)

    const total = left + right

    return total;
}

console.log('sum of range (2,8)', sumOfRange(2, 8))

function update(updateIndex, value) {
    const current = target[updateIndex]
    const diff = value - current
    target[updateIndex] = value

    function updateSegmentTree(destinationIndex) {
        if (!segmentTree[destinationIndex]) { return }

        const [sum, start, end] = segmentTree[destinationIndex]
        if (updateIndex >= start && updateIndex <= end) {
            segmentTree[destinationIndex] = [sum + diff, start, end]
            updateSegmentTree((destinationIndex * 2) + 1)
            updateSegmentTree((destinationIndex * 2) + 2)
        }
    }

    updateSegmentTree(0)
}

// update 5 index value to 8 from 6
update(5, 8)

console.log('sum of range (2,8) after updating', sumOfRange(2, 8))
