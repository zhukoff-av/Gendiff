import yaml from 'js-yaml';
import ini from 'ini';
import path from 'path';
import fs from 'fs';

const typeParse = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

// export default format => (someData) => {
//   const parseItem = typeFile[format];
//   return parseItem(someData);
// };

const parseFile = (file) => {
  const format = path.extname(file);
  const data = fs.readFileSync(file, 'utf-8');
  return typeParse[format](data);
};
export default parseFile;
