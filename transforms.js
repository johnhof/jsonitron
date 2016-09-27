'use strict';

const CASE = require('change-case');

// Cases
module.exports.upper = (v, k) => CASE.upperCase(v || '');
module.exports.constant = (v, k) => CASE.constantCase(v || '');
module.exports.dot = (v, k) => CASE.dotCase(v || '');
module.exports.header = (v, k) => CASE.headerCase(v || '');
module.exports.lower = (v, k) => CASE.lowerCase(v || '');
module.exports.lowerFirst = (v, k) => CASE.lcFirstCase(v || '');
module.exports.no = (v, k) => CASE.noCase(v || '');
module.exports.param = (v, k) => CASE.paramCase(v || '');
module.exports.pascal = (v, k) => CASE.pascalCase(v || '');
module.exports.path = (v, k) => CASE.pathCase(v || '');
module.exports.sentence = (v, k) => CASE.sentenceCase(v || '');
module.exports.snake = (v, k) => CASE.snakeCase(v || '');
module.exports.swap = (v, k) => CASE.swapCase(v || '');
module.exports.title = (v, k) => CASE.titleCase(v || '');
module.exports.upper = (v, k) => CASE.upperCase(v || '');
module.exports.upperFirst = (v, k) => CASE.ucFirstCase(v || '');

// String Manipulation
module.exports.rename = (v, k, p) => k = p;
