import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getRenderer from './renderers';
import parser from './parse';
import makeAst from './buildAst'

const genDiff = (fileBefore, fileAfter, type = 'default') => {
  const typeFile = path.extname(fileBefore);
  const dataBefore = fs.readFileSync(fileBefore, 'utf-8');
  const dataAfter = fs.readFileSync(fileAfter, 'utf-8');
  const parsedDataBefore = parser(dataBefore, typeFile);
  const parsedDataAfter = parser(dataAfter, typeFile);
  const ast = makeAst(parsedDataBefore, parsedDataAfter);
  return getRenderer(ast, type);
};

export default genDiff;
