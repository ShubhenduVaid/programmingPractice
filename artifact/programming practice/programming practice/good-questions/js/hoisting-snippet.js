var a = 1;

function foo(a) {
  console.log(a);
  a = 2;
  bar(function () {
    console.log(a);
    a = 4;
  });
}

function bar(callback) {
  console.log(a);
  callback();
  a = 3;
}

foo();
console.log(a);
