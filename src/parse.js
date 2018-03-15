import yaml from 'js-yaml';
import ini from 'ini';

const parsing = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default format => (someData) => {
  const parseItem = parsing[format];
  return parseItem(someData);
};
