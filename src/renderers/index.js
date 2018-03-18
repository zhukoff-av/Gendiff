import renderPlain from './plain';
import renderTree from './tree';
import renderJson from './json';

const chooseRender = {
  default: renderTree,
  plain: renderPlain,
  json: renderJson,
};

const render = type => chooseRender[type];

export default render;
