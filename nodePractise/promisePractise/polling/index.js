const { fetchData, postData } = require("./utils");

async function fetchAndRetry(retryCount = 1) {
  try {
    const data = await fetchData();
    return data;
  } catch (error) {
    while (retryCount > 0) {
      console.error("Retrying Fetch:", retryCount);
      retryCount--;
      const data = await fetchAndRetry(retryCount);
      return data;
    }
  } finally {
    if (retryCount === 0) {
      throw new Error("Fetch Retries Failed");
    }
  }
}

async function postAndRetry(data, retryCount = 1) {
  try {
    await postData(data);
  } catch (error) {
    while (retryCount > 0) {
      retryCount--;
      console.error("Retrying POST:", retryCount);
      await postAndRetry(data, retryCount);
    }
  } finally {
    if (retryCount === 0) {
      throw new Error("Post Retries Failed");
    }
  }
}

function polling() {
  setInterval(async () => {
    try {
      // const data = await fetchAndRetry(3);
      await postAndRetry("DATA", 3);
    } catch (error) {
      console.error(error);
    }
  }, 20000);
}

module.exports = { polling };
