const target = [100, 80, 120, 130, 70, 60, 100, 125]

let maxProfit = 0;
let minStockPrice = Infinity

for (let i = 0; i < target.length; i++) {
    const element = target[i];
    if (minStockPrice > element) {
        minStockPrice = element
    }
    else {
        maxProfit = Math.max(maxProfit, element - minStockPrice)
    }
}

console.log("LOG: maxProfit", maxProfit)
console.log("LOG: minStockPrice", minStockPrice)
