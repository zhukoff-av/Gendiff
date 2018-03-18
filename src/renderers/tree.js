import _ from 'lodash';

const renderToTree = (ast) => {
  const iter = (data, indentLvl) => {
    const indent = ' '.repeat(indentLvl);
    const indForValue = ' '.repeat(indentLvl + 6);
    const indForBrace = ' '.repeat(indentLvl + 2);

    const objToString = (arg) => {
      const keys = Object.keys(arg);
      const arr = keys.map(key => (arg[key] instanceof Object ? objToString(arg[key]) :
        `${key}: ${arg[key]}`));

      return arr.join(`\n ${' '.repeat(indentLvl + 4)} `);
    };

    const valueToString = (value) => {
      const stringForComplex = ` {\n${indForValue}${objToString(value)}\n${indForBrace}}`;
      const stringForSimple = ` ${value}`;
      return value instanceof Object ? stringForComplex : stringForSimple;
    };

    const stringAction = {
      nested: node =>
        `${indent}  ${node.key}: {\n${iter(node.children, indentLvl + 4)}\n${indForBrace}}`,
      unchanged: node =>
        `${indent}  ${node.key}:${valueToString(node.valueAfter)}`,
      added: node =>
        `${indent}+ ${node.key}:${valueToString(node.valueAfter)}`,
      removed: node =>
        `${indent}- ${node.key}:${valueToString(node.valueBefore)}`,
      updated: node =>
        [`${indent}- ${node.key}: ${node.valueBefore}\n${indent}+ ${node.key}: ${node.valueAfter}`],
    };

    const getString = node => stringAction[node.type](node);

    const arr = data.map(node => getString(node));
    return _.flatten(arr).join('\n');
  };
  const output = iter(ast, 2);
  return `{\n${output}\n}\n`;
};

export default renderToTree;
