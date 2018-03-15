import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import parsing from './parse';

const genDiff = (pathToFileA, pathToFileB) => {
  const dataA = fs.readFileSync(pathToFileA, 'utf8');
  const dataB = fs.readFileSync(pathToFileB, 'utf8');
  const extensionOfPathA = path.extname(pathToFileA);
  const extensionOfPathB = path.extname(pathToFileB);
  const parseA = parsing(extensionOfPathA);
  const parseB = parsing(extensionOfPathB);
  const fileA = parseA(dataA);
  const fileB = parseB(dataB);
  const keys = _.union(_.keys(fileA), _.keys(fileB));
  return keys.reduce((acc, key) => {
    const objectFirst = fileA[key];
    const objectSecond = fileB[key];
    if (objectFirst && objectSecond) {
      if (objectFirst === objectSecond) {
        return [...acc, `  ${key}: ${fileA[key]}`];
      }
      if (objectFirst !== objectSecond) {
        return [...acc, `+ ${key}: ${fileB[key]}`, `- ${key}: ${fileA[key]}`];
      }
    }
    if (objectFirst && !objectSecond) {
      return [...acc, `- ${key}: ${fileA[key]}`];
    }
    if (!objectFirst && objectSecond) {
      return [...acc, `+ ${key}: ${fileB[key]}`];
    }
    return '';
  }, []).join('\n');
};
export default genDiff;
