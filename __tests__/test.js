import fs from 'fs';
import genDiff from '../src';


const pathToFile1 = '__tests__/__fixtures__/before.json';
const pathToFile2 = '__tests__/__fixtures__/after.json';

test('genDiff', () => {
  expect(genDiff(pathToFile1, pathToFile2)).toEqual(fs.readFileSync('__tests__/__fixtures__/expectedResult.txt', 'utf8'));
});
