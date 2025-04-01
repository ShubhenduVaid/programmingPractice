// const api = () => Promise.reject("error");
// // const api = () => Promise.resolve("response");

// const promise = api()


// promise.then((data) => {
//     console.log('1', data);
//   })
//   .catch((error) => {
//     console.error('2', error);
//   })
//   .catch((error) => {
//     console.error('3', error);
//   })
//   .then((data) => {
//     console.log('4', data);
//   })
//   .catch((error) => {
//     console.error('5', error);
//   });



// promise.then((data) => {
//     console.log('1', data);
//   })
//   .catch((error) => {
//     console.error('2', error);
//   })
//   .catch((error) => {
//     console.error('3', error);
//   })
//   .then((data) => {
//     console.log('4', data);
//   })
//   .catch((error) => {
//     console.error('5', error);
//   });


function top(){
  var a = 'foo'
  inner();
}
function inner(){
  console.log(a)
}

top()