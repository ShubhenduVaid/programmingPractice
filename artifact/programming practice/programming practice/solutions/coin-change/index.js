const target = 10;
const coins = [2, 3, 5, 6]

const arr = new Array(target)

arr[0] = 1


for (let coinIndex = 0; coinIndex < coins.length; coinIndex++) {
    const coin = coins[coinIndex];
    for (let amount = coin; amount <= target; amount++) {
        const left = amount - coin;
        arr[amount] = (arr[amount] || 0) + (arr[left] || 0)
    }
}

console.log("LOG: arr", arr)
