import fs from 'fs';
import genDiff from '../src';

const pathToJsonA = '__tests__/__fixtures__/before.json';
const pathToJsonB = '__tests__/__fixtures__/after.json';
const pathToIniA = '__tests__/__fixtures__/before.ini';
const pathToIniB = '__tests__/__fixtures__/after.ini';
const pathToYmlA = '__tests__/__fixtures__/before.yml';
const pathToYmlB = '__tests__/__fixtures__/after.yml';

test('JSON diff', () => {
  expect(genDiff(pathToJsonA, pathToJsonB)).toEqual(fs.readFileSync('__tests__/__fixtures__/expectedResult.txt', 'utf8'));
});

test('Yml diff', () => {
  expect(genDiff(pathToYmlA, pathToYmlB)).toEqual(fs.readFileSync('__tests__/__fixtures__/expectedResult.txt', 'utf8'));
});

test('Ini diff', () => {
  expect(genDiff(pathToIniA, pathToIniB)).toEqual(fs.readFileSync('__tests__/__fixtures__/expectedResult.txt', 'utf8'));
});
