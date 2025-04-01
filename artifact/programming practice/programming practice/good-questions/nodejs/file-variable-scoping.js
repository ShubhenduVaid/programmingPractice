// file1.js
console.log(count) 
var count = 1
count++
console.log(count) 

// file2.js
console.log(count) 
count = 1 
console.log(count) 

// app.js
// require('file1')
// require('file2')

console.log(count) 
count = 5
console.log(count)