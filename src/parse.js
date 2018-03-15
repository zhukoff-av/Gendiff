import yaml from 'js-yaml';

const parsing = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
};

export default format => (someData) => {
  const parseItem = parsing[format];
  return parseItem(someData);
};
