import _ from 'lodash';

const buildAst = (dataBefore, dataAfter) => {
  const unionKeys = _.union(Object.keys(dataBefore), Object.keys(dataAfter));
  const build = (key, objectBefore, objektAfter) => {
    if (_.isObject(objectBefore[key]) && _.isObject(objektAfter[key])) {
      return {
        type: 'nested',
        name: key,
        children: buildAst(objectBefore[key], objektAfter[key])
      };
    }
    if (objectBefore[key] === objektAfter[key]) {
      return {
        type: 'unchanged',
        name: key,
        value: objectBefore[key]
      };
    }
    if (!_.has(objectBefore, key)) {
      return {
        type: 'added',
        name: key,
        value: objektAfter[key]
      };
    }
    if (!_.has(objektAfter, key)) {
      return {
        type: 'removed',
        name: key,
        value: objectBefore[key]
      };
    }
    return {
      type: 'updated',
      name: key,
      value2: objektAfter[key],
      value1: objectBefore[key]
    };
  };
  return unionKeys.map(key => build(key, dataBefore, dataAfter));
};

export default buildAst;
