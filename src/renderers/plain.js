const renderPlain = (ast) => {
  const iter = (data, pathAcc) => {
    const checkComplexValue = arg => (arg instanceof Object ? 'complex value' : arg);

    const stringAction = {
      nested: (node) => {
        const newPathAcc = `${pathAcc}${node.key}.`;
        return iter(node.children, newPathAcc);
      },
      added: node =>
        `Property '${pathAcc}${node.key}' was added with value: ${checkComplexValue(node.valueAfter)}`,
      removed: node =>
        `Property '${pathAcc}${node.key}' was removed`,
      updated: node =>
        `Property '${pathAcc}${node.key}' was updated. From '${node.valueBefore}' to '${node.valueAfter}'`,
      unchanged: () => '',
    };

    const getString = arg => stringAction[arg.type](arg);

    const result = data.map(node => getString(node)).filter(v => v);
    return result.join('\n');
  };
  const output = iter(ast, '');
  return `\n${output}\n`;
};

export default renderPlain;
