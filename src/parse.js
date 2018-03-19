import yaml from 'js-yaml';
import ini from 'ini';

const chooseParser = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const parseData = (file, format) => {
  return chooseParser[format](file);
};
export default parseData;
