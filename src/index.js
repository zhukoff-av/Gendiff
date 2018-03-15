import _ from 'lodash';
import parseFile from './parse';

const genDiff = (file1, file2) => {
  const object1 = parseFile(file1);
  const object2 = parseFile(file2);
  const keys = _.union(Object.keys(object1), Object.keys(object2));
  const result = keys.reduce((acc, key) => {
    if (!object2[key]) {
      return [...acc, ` - ${key}: ${object1[key]}`];
    }
    if (!object1[key]) {
      return [...acc, ` + ${key}: ${object2[key]}`];
    }
    if (object1[key] === object2[key]) {
      return [...acc, `${key}: ${object1[key]}`];
    }
    return [...acc, ` + ${key}: ${object2[key]}\n - ${key}: ${object1[key]}`];
  }, []).join('\n');
  return result;
};

export default genDiff;
