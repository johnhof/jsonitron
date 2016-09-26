'use strict';

const CASE = require('change-case');

// Cases
module.exports.upper = (s) => CASE.upperCase(s || '');
module.exports.constant = (s) => CASE.constantCase(s || '');
module.exports.dot = (s) => CASE.dotCase(s || '');
module.exports.header = (s) => CASE.headerCase(s || '');
module.exports.lower = (s) => CASE.lowerCase(s || '');
module.exports.lowerFirst = (s) => CASE.lcFirstCase(s || '');
module.exports.no = (s) => CASE.noCase(s || '');
module.exports.param = (s) => CASE.paramCase(s || '');
module.exports.pascal = (s) => CASE.Case(s || '');
module.exports.path = (s) => CASE.Case(s || '');
module.exports.sentence = (s) => CASE.Case(s || '');
module.exports.snake = (s) => CASE.Case(s || '');
module.exports.swap = (s) => CASE.Case(s || '');
module.exports.title = (s) => CASE.Case(s || '');
module.exports.upper = (s) => CASE.Case(s || '');
module.exports.upperFirst = (s) => CASE.ucFirstCase(s || '');
