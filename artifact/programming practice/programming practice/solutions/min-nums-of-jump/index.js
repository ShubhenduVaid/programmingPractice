// greedy approach : does not give the minimum number
var canJump = function (nums) {
    let stepsLeft = 1

    let ladderFound = false;
    let i = 0

    while (ladderFound === false && i < nums.length) {
        if (nums.length === 1) {
            ladderFound = true
        }

        stepsLeft--

        stepsLeft = Math.max(stepsLeft, nums[i])

        if ((i + 1 + stepsLeft) > nums.length) {
            ladderFound = true
        }

        i++
    }

    return ladderFound
};

var minJumps = function (nums) {
    let jumps = [0]
    let path = [0]
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            const ladder = nums[j];
            if (j + ladder >= i) {
                if (jumps[i] === undefined ? Infinity : jumps[i] > jumps[j] + 1) {
                    jumps[i] = jumps[j] + 1
                    path[i] = j
                }
            }
        }
    }

    console.log(jumps);
    console.log(path);

    return jumps[nums.length - 1]
};

console.log(minJumps([7, 0, 9, 6, 9, 6, 1, 7, 9, 0, 1, 2, 9, 0, 3]));