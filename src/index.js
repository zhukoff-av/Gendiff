import _ from 'lodash';
import fs from 'fs';

const getData = path => JSON.parse(fs.readFileSync(path));
const genDiff = (pathToFile1, pathToFile2) => {
  const file1 = getData(pathToFile1);
  const file2 = getData(pathToFile2);
  const key1 = Object.keys(file1);
  const key2 = Object.keys(file2);
  const keys = _.union(key1, key2);
  return keys.reduce((acc, key) => {
    const objectFirst = file1[key];
    const objectSecond = file2[key];
    if (objectFirst && objectSecond) {
      if (objectFirst === objectSecond) {
        return `${acc}  ${key}: ${file1[key]}\r\n`;
      }
      if (objectFirst !== objectSecond) {
        return `${acc}+ ${key}: ${file2[key]}\r\n- ${key}: ${file1[key]}\r\n`;
      }
    }
    if (objectFirst && !objectSecond) {
      return `${acc}- ${key}: ${file1[key]}\r\n`;
    }
    if (!objectFirst && objectSecond) {
      return `${acc}+ ${key}: ${file2[key]}\r\n`;
    }
    return '';
  }, '');
};
export default genDiff;
