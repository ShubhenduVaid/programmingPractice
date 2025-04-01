Promise.resolve(1)
  .then((output) => {
    console.log(output);
    return 2;
  })
  .then((output) => {
    console.log(output);
    return 3;
  })
  .then((output) => {
    throw new Error("error");
  })
  .catch((error) => {
    console.log(error);
    return 4;
  })
  .then((output) => {
    console.log(output);
    return 5;
  });
