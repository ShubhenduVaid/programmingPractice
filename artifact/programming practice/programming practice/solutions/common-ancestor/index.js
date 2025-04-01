const tree = {
    v: 1,
    l: {
        v: 2,
        l: {
            v: 4
        },
        r: {
            v: 5,
            l: {
                v: 7
            },
            r: {
                v: 8
            }
        }
    },
    r: {
        v: 3
    }
}

function commonAncestor(node, target1, target2) {
    if (!node) {
        return null
    }

    if (node.v === target1 || node.v === target2) {
        return node
    }

    const left = commonAncestor(node.l, target1, target2)
    const right = commonAncestor(node.r, target1, target2)

    if (left && right) {
        return node
    }

    if (left) return left
    else return right
}

console.log(commonAncestor(tree, 1, 5).v);