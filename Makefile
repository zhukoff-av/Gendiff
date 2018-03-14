# Makefile

install:
	npm install

start:
	npm run babel-node -- src/bin/gendiff.js

publish:
	npm publish

build:
	npm run build

test:
	npm test

lint:
	npm run eslint .
