import fs from 'fs';
import genDiff from '../src';

// references to result files
const result = '__tests__/__fixtures__/result.txt';
const resultTree = '__tests__/__fixtures__/resultTree.txt';
const plainResultTree = '__tests__/__fixtures__/resultPlain.txt';
const jsonResultTree = '__tests__/__fixtures__/resultJson.txt';

// test data
const beforeJson = '__tests__/__fixtures__/before.json';
const afterJson = '__tests__/__fixtures__/after.json';
const beforeYml = '__tests__/__fixtures__/before.yml';
const afterYml = '__tests__/__fixtures__/after.yml';
const beforeIni = '__tests__/__fixtures__/before.ini';
const afterIni = '__tests__/__fixtures__/after.ini';
const treeBeforeJson = '__tests__/__fixtures__/treeBefore.json';
const treeAfterJson = '__tests__/__fixtures__/treeAfter.json';
const treeBeforeYml = '__tests__/__fixtures__/treeBefore.yml';
const treeAfterYml = '__tests__/__fixtures__/treeAfter.yml';
const treeBeforeIni = '__tests__/__fixtures__/treeBefore.ini';
const treeAfterIni = '__tests__/__fixtures__/treeAfter.ini';

test('diff JSONs', () => {
  expect(genDiff(beforeJson, afterJson))
    .toEqual(fs.readFileSync(result, 'utf8'));
});
test('diff YAMLs', () => {
  expect(genDiff(beforeYml, afterYml))
    .toEqual(fs.readFileSync(result, 'utf8'));
});
test('diff INI', () => {
  expect(genDiff(beforeIni, afterIni))
    .toEqual(fs.readFileSync(result, 'utf8'));
});
test('diff tree JSON', () => {
  expect(genDiff(treeBeforeJson, treeAfterJson))
    .toEqual(fs.readFileSync(resultTree, 'utf8'));
});
test('diff tree YAML', () => {
  expect(genDiff(treeBeforeYml, treeAfterYml))
    .toEqual(fs.readFileSync(resultTree, 'utf8'));
});
test('diff tree INI', () => {
  expect(genDiff(treeBeforeIni, treeAfterIni))
    .toEqual(fs.readFileSync(resultTree, 'utf8'));
});
test('diff tree JSON => plain output', () => {
  expect(genDiff(treeBeforeJson, treeAfterJson, 'plain'))
    .toEqual(fs.readFileSync(plainResultTree, 'utf8'));
});
test('diff tree JSONs => json output', () => {
  expect(genDiff(treeBeforeJson, treeAfterJson, 'json'))
    .toEqual(fs.readFileSync(jsonResultTree, 'utf8'));
});
