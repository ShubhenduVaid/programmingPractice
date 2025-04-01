const j = require("jscodeshift");
var pathModule = require("path");

module.exports = function transformer(file, api) {
  const jscodeshift = api.jscodeshift;
  const root = jscodeshift(file.source);

  root.find(j.Literal).forEach((path) => {
    if (
      typeof path.value.value === "string" &&
      path.value.value.startsWith("..")
    ) {
      const targetFile = file.path;
      const relativePath = path.value.value;

      const absolutePath = pathModule.resolve(targetFile, "..", relativePath);
      const aliasPath = absolutePath.split("/mpac-app-listing/")[1];
      if (aliasPath) {
        path.value.value = "mpac-app-listing/" + aliasPath;
      }
    }
  });

  return root.toSource();
};
