const renderToJson = (ast) => {
  const result = JSON.stringify(ast);
  return `${result}\n`;
};

export default renderToJson;
