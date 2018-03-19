import _ from 'lodash';

const valueToString = (data, indentLvl) => {
  if (_.isObject(data)) {
    const keys = Object.keys(data);
    const resultString = keys.map(n => `${' '.repeat(indentLvl + 6)}${n}: ${data[n]}`).join('\n');
    return `{\n${resultString}\n${' '.repeat(indentLvl + 2)}}`;
  }
  return `${data}`;
};

const removed = (el, index) => {
  const { name, value } = el;
  const indentLvl = index * 2;
  return `${' '.repeat(indentLvl)}- ${name}: ${valueToString(value, indentLvl)}`;
};

const added = (el, index) => {
  const { name, value } = el;
  const indentLvl = index * 2;
  return `${' '.repeat(indentLvl)}+ ${name}: ${valueToString(value, indentLvl)}`;
};

const unchanged = (el, index) => {
  const { name, value } = el;
  const indentLvl = index * 2;
  return `${' '.repeat(indentLvl + 2)}${name}: ${valueToString(value, indentLvl)}`;
};

const nested = (el, index, fn) => {
  const { name, children } = el;
  const indentLvl = index * 2;
  return `${' '.repeat(indentLvl + 2)}${name}: {\n${fn(children, index + 2)}
  ${' '.repeat(indentLvl + 2)}}`;
};

const updated = (el, index) => {
  const { name, value1, value2 } = el;
  const indentLvl = index * 2;
  return [`${' '.repeat(indentLvl)}- ${name}: ${valueToString(value1, indentLvl)}`,
    `${' '.repeat(indentLvl)}+ ${name}: ${valueToString(value2, indentLvl)}`];
};

const parserTypes = {
  updated: updated,
  unchanged: unchanged,
  added: added,
  removed: removed,
  nested: nested
};

const renderAst = (ast, index) => {
  const parse = (el, indentLvl) => parserTypes[el.type](el, indentLvl, renderAst);
  const resultAst = ast.map(el => parse(el, index));
  return _.flatten(resultAst).join(`\n`);
};

export default ast => `{\n${renderAst(ast, 1)}\n}`;
