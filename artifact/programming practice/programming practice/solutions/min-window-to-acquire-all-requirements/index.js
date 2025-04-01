const blocks = [
    {
        gym: false,
        school: true,
        store: false,
    },
    {
        gym: true,
        school: false,
        store: false,
    },
    {
        gym: true,
        school: true,
        store: false,
    },
    {
        gym: false,
        school: true,
        store: false,
    },
    {
        gym: false,
        school: true,
        store: true,
    },
]

const requirements = ['gym', 'school', 'store']

const reqMap = { uniqueSize: 0 }
for (let i = 0; i < requirements.length; i++) {
    const element = requirements[i];
    reqMap[element] = 0
}

let left = 0;
let right = 0;
let answers = []
while (right < blocks.length) {
    // if all requirements are not found
    if (reqMap.uniqueSize !== requirements.length) {
        const block = blocks[right]
        requirements.forEach(item => {
            // block has the requirement
            if (block[item] === true) {
                if (reqMap[item] === 0) {
                    reqMap.uniqueSize++
                }

                reqMap[item]++;
            }
        })

        if (reqMap.uniqueSize === requirements.length) {
            answers.push([left, right])
        }
        else {
            right++
        }
    }
    else {
        const block = blocks[left]
        requirements.forEach(item => {
            // block has the requirement
            if (block[item] === true) {
                reqMap[item]--;
                if (reqMap[item] === 0) {
                    reqMap.uniqueSize--
                }
            }
        })

        if (reqMap.uniqueSize === requirements.length) {
            left++;
            answers.push([left, right])
        }
    }
}

console.log("LOG: answers", answers)
