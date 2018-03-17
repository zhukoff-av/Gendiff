import fs from 'fs';
import genDiff from '../src';
import renderers from '../src/renderers';

const pathToJsonA = '__tests__/__fixtures__/before.json';
const pathToJsonB = '__tests__/__fixtures__/after.json';
const pathToIniA = '__tests__/__fixtures__/before.ini';
const pathToIniB = '__tests__/__fixtures__/after.ini';
const pathToYmlA = '__tests__/__fixtures__/before.yml';
const pathToYmlB = '__tests__/__fixtures__/after.yml';
const pathToTreeA = '__tests__/__fixtures__/before_tree.json';
const pathToTreeB = '__tests__/__fixtures__/after_tree.json';

test('JSON diff', () => {
  expect(genDiff(pathToJsonA, pathToJsonB)).toEqual(fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf8'));
});

test('Yml diff', () => {
  expect(genDiff(pathToYmlA, pathToYmlB)).toEqual(fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf8'));
});

test('Ini diff', () => {
  expect(genDiff(pathToIniA, pathToIniB)).toEqual(fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf8'));
});

test('Ast diff', () => {
  expect(genDiff(pathToTreeA, pathToTreeB)).toEqual(fs.readFileSync('__tests__/__fixtures__/result_tree_json.txt', 'utf8'));
});

test('Plain diff', () => {
  expect(genDiff(pathToTreeA, pathToTreeB, renderers.plain)).toEqual(fs.readFileSync('__tests__/__fixtures__/result_plain.txt', 'utf8'));
});

test('json output', () => {
  expect(genDiff(pathToTreeA, pathToTreeB, renderers.json)).toEqual(fs.readFileSync('__tests__/__fixtures__/result_format_json.txt', 'utf8'));
});
