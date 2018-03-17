import _ from 'lodash';

const getMainStr = (property, propertyType) => `Property '${property}' was ${propertyType}`;
const getFromStr = (from, to) => `. From ${from} to ${to}`;
const getWithStr = valueStr => ` with ${valueStr}`;

const renderInsertedProp = (node, property) => {
  const valueStr = (_.isObject(node.value)) ? 'complex value' : `value: ${node.value}`;
  return `${getMainStr(property, 'added')}${getWithStr(valueStr)}`;
};

const renderPlain = (ast, prop = '') => {
  const diffText = ast.map((node) => {
    const property = `${prop}${node.name}`;
    if (node.type === 'nested') {
      return renderPlain(node.children, `${property}.`);
    }
    if (node.type === 'deleted') {
      return getMainStr(property, 'removed');
    }
    if (node.type === 'inserted') {
      return renderInsertedProp(node, property);
    }
    if (node.type === 'changed') {
      return `${getMainStr(property, 'updated')}${getFromStr(node.value.old, node.value.new)}`;
    }
    return '';
  });

  return diffText.filter(el => el !== '').join('\n');
};

export default renderPlain;
