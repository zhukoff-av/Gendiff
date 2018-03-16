import { union, _ } from 'lodash';

const keyTypes = [
  {
    type: 'nested',
    check: (first, second, key) => (_.isObject(first[key]) && _.isObject(second[key]))
      && !(first[key] instanceof Array && second[key] instanceof Array),
    process: (first, second, func) => func(first, second),
  },
  {
    type: 'not changed',
    check: (first, second, key) => first[key] && second[key]
      && first[key] === second[key],
    process: first => first,
  },
  {
    type: 'changed',
    check: (first, second, key) => first[key] && second[key]
      && first[key] !== second[key],
    process: (first, second) => ({ old: first, new: second }),
  },
  {
    type: 'deleted',
    check: (first, second, key) => first[key] && !second[key],
    process: first => first,
  },
  {
    type: 'inserted',
    check: (first, second, key) => !first[key] && second[key],
    process: (first, second) => second,
  },
];

const doAST = (firstConfig = {}, secondConfig = {}) => {
  const commonKeys = union(Object.keys(firstConfig), Object.keys(secondConfig));
  return commonKeys.map((key) => {
    const { type, process } = keyTypes.find(item => item.check(firstConfig, secondConfig, key));
    const value = process(firstConfig[key], secondConfig[key], doAST);
    return (type === 'nested') ? { name: key, type, children: value } : { name: key, type, value };
  });
};

export default doAST;
