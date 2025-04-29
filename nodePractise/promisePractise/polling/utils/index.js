async function fetchData() {
  if (Math.random() > 0.7) {
    const url = "https://images-api.nasa.gov/search?q=moon";
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } else {
    return Promise.reject("Error");
  }
}

async function postData(data) {
  if (Math.random() > 0.5) {
    console.log("Posting", data);
    return Promise.resolve("Success");
  } else {
    return Promise.reject("Error");
  }
}

module.exports = { fetchData, postData };
