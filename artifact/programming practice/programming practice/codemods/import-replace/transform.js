module.exports.parser = 'tsx'; // use the flow parser
var path = require('path');

export const IMPORT_VALUE_TO_FIND = '../';
export const REPLACE_WITH = 'amkt-fronted/';

export default (fileInfo, api) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  const importDeclaration = root.find(j.ImportDeclaration, {
    source: {
      type: 'StringLiteral',
    },
  });

  const literalDeclarations = importDeclaration.find(j.Literal);
  let importValue;
  literalDeclarations.forEach(literal => {
    const thisValue = literal.get(0).node.value;

    if (thisValue.includes(IMPORT_VALUE_TO_FIND)) {
      importValue = thisValue;
    }
  });

  console.log('>> import value found', importValue);
  if (!importValue) {
    console.log('>> NO Import value found, skipping');
    return root.toSource();
  }

  return root
    .find(j.ImportDeclaration,
       {
      // source: {
      //   type: 'StringLiteral',
      //   value: importValue,
      // },
    })
    .filter( nodePath => 
      {
        const {node} = nodePath;
        return node.source.value.includes(IMPORT_VALUE_TO_FIND);
      })

    .replaceWith(nodePath => {
      // get the underlying Node
      const { node } = nodePath;
      console.log('>> Replacing with absolute impots');
      node.source.value = path.resolve(fileInfo.path, "../" + node.source.value);
      // node.source.raw = REPLACE_WITH;
      // change to our new prop
      // node.property.value = 'getCircleArea';
      // replaceWith should return a Node, not a NodePath
      return node;
    })

    .toSource();
};
