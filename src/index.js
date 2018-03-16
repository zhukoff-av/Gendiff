import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import doAST from './ast';
import renders from './renders';

const readFile = pathToFile => fs.readFileSync(path.normalize(pathToFile), 'utf8');

const parser = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const getContent = (...paths) => paths
  .map(exactPath => parser[path.extname(exactPath)](readFile(exactPath)));

const gendiff = (pathToFile1, pathToFile2, render = renders.default) => {
  const diffAst = doAST(...getContent(pathToFile1, pathToFile2));

  return render(diffAst);
};

export default gendiff;
