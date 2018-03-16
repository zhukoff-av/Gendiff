import _ from 'lodash';

const renderTypes = [
  {
    type: 'inserted',
    render: (key, value) => `+ ${key}: ${value}`,
  },
  {
    type: 'deleted',
    render: (key, value) => `- ${key}: ${value}`,
  },
  {
    type: 'changed',
    render: (key, value, tabsSpace) => `+ ${key}: ${value.new}\n${tabsSpace}- ${key}: ${value.old}`,
  },
  {
    type: 'not changed',
    render: (key, value) => `  ${key}: ${value}`,
  },
];

const objectRender = (node, tabsGroupElement) => Object.keys(node).map(key => `${tabsGroupElement}${key}: ${node[key]}`).join('\n');
const nodeobjectRender = (tabsDiff, node, tabsGroupElement, tabsSpace) => {
  const sign = (node.type === 'deleted') ? '-' : '+';
  return `${tabsDiff}${sign} ${node.name}: {\n${objectRender(node.value, tabsGroupElement)}\n${tabsSpace}}`;
};

const renderTree = (ast, tabs = 1) => {
  const tabsSpace = ' '.repeat(tabs * 4);
  const tabsDiff = ' '.repeat((tabs * 4) - 2);
  const tabsGroupElement = ' '.repeat((tabs + 1) * 4);
  const diffText = ast.map((node) => {
    if (node.type === 'nested') {
      return `${tabsSpace}${node.name}: {\n${renderTree(node.children, tabs + 1)}\n${tabsSpace}}`;
    }
    if (node.type === 'deleted' || node.type === 'inserted') {
      if (_.isObject(node.value)) {
        return nodeobjectRender(tabsDiff, node, tabsGroupElement, tabsSpace);
      }
    }
    const { render } = renderTypes.find(item => item.type === node.type);
    return `${tabsDiff}${render(node.name, node.value, tabsDiff)}`;
  });
  return diffText.join('\n');
};
const renderTreeDiff = ast => `{\n${renderTree(ast)}\n}`;

export default renderTreeDiff;
