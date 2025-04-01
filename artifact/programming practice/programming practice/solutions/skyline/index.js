function getSkyline(buildings) {
    const skyline = [];

    const startEnds = []

    for (let i = 0; i < buildings.length; i++) {
        const [start, end, height] = buildings[i];

        startEnds.push([start, -Math.abs(height)])
        startEnds.push([end, Math.abs(height)])
    }

    let startEndsSorted = startEnds.sort((a, b) => a[0] - b[0])
    // tie breaker 
    startEndsSorted = startEnds.sort((a, b) => {
        if (a[0] === b[0]) {
            return a[1] - b[1]
        }
        return a[0] - b[0]
    })

    let maxActiveHeight = 0
    let activeHeights = []

    for (let i = 0; i < startEndsSorted.length; i++) {
        const [x, height] = startEndsSorted[i];
        const absHeight = Math.abs(height)

        // if height is neg then its start otherwise end
        if (height < 0) {
            if (absHeight > maxActiveHeight) {
                skyline.push([x, absHeight])

                maxActiveHeight = absHeight
            }

            activeHeights.push(absHeight)
            activeHeights.sort((a, b) => a - b)
        }
        else {
            const removeAt = activeHeights.indexOf(absHeight)
            activeHeights.splice(removeAt, 1)
            maxActiveHeight = activeHeights.length ? Math.max(...activeHeights) : 0

            if (absHeight > maxActiveHeight) {
                skyline.push([x, maxActiveHeight])
            }

        }
    }

    return skyline;
}


// getSkyline([[2, 9, 10], [3, 7, 15], [5, 12, 12], [15, 20, 10], [19, 24, 8]])
getSkyline([[0, 2, 3], [2, 5, 3]]) // end point is the start point of other
// getSkyline([[2, 6, 10], [4, 6, 8]]) // both ending on same point at different height