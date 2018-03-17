import renderPlain from './plain';
import renderTree from './tree';
import renderJson from './json';

const chooseRender = {
  plain: renderPlain,
  undefined: renderTree,
  json: renderJson,
};

const render = type => chooseRender[type];

export default render;
