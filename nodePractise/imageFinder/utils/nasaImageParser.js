const nasaImageParser = function (json) {
  const items = json.collection.items.map((item) => {
    item = item?.links?.filter((link) => link.rel === "preview");
    return item;
  });
  const links = items
    .flat()
    .map((item) => item?.href)
    .filter((href) => href);

  return links;
};

module.exports = nasaImageParser;
