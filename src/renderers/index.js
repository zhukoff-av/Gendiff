import renderPlain from './plain';
import renderTree from './tree';
import renderJson from './json';

const chooseRender = {
  default: renderTree,
  plain: renderPlain,
  json: renderJson
};

const renderAst = (ast, type) => {
  return chooseRender[type](ast);
};

export default renderAst;
