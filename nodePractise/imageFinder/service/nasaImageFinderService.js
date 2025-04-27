const nasaImageParser = require("../utils/nasaImageParser");

const nasaImageFinderService = async function (query) {
  const url = `https://images-api.nasa.gov/search?q=${query}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error with calling API");
    }
    const json = await response.json();
    const result = nasaImageParser(json);
    return Promise.resolve(result);
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

module.exports = nasaImageFinderService;
