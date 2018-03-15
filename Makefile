install:
	npm install

start:
	npm run babel-node -- src/bin/gendiff.js -h

publish:
	npm publish

test:
	npm test

lint:
		npm run eslint .
