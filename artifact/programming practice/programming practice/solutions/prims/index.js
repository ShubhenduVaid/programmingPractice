const adjacencyList = {
    0: [
        {
            index: 1,
            weight: 10
        },
        {
            index: 3,
            weight: 40
        }
    ],
    1: [
        {
            index: 2,
            weight: 10,
        },
        {
            index: 0,
            weight: 10,
        },
    ],
    2: [
        {
            index: 3,
            weight: 10,
        },
        {
            index: 1,
            weight: 10,
        },
    ],
    3: [
        {
            index: 4,
            weight: 2,
        },
        {
            index: 0,
            weight: 40,
        },
    ],
    4: [
        {
            index: 6,
            weight: 8,
        },
        {
            index: 5,
            weight: 3,
        },
        {
            index: 3,
            weight: 2,
        },
    ],
    5: [
        {
            index: 4,
            weight: 3,
        },
        {
            index: 6,
            weight: 3,
        },
    ],
    6: [
        {
            index: 4,
            weight: 8,
        },
        {
            index: 5,
            weight: 3,
        },
    ],
}