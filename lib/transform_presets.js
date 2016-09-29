'use strict';

const CASE = require('change-case');

// Cases - Value
module.exports.upperCase = function (v) { this.setVal(CASE.upperCase(v || '')); };
module.exports.camelCase = function (v) { this.setVal(CASE.camelCase(v || '')); };
module.exports.constantCase = function (v) { this.setVal(CASE.constantCase(v || '')); };
module.exports.dotCase = function (v) { this.setVal(CASE.dotCase(v || '')); };
module.exports.headerCase = function (v) { this.setVal(CASE.headerCase(v || '')); };
module.exports.lowerCase = function (v) { this.setVal(CASE.lowerCase(v || '')); };
module.exports.lowerFirstCase = function (v) { this.setVal(CASE.lcFirstCase(v || '')); };
module.exports.noCase = function (v) { this.setVal(CASE.noCase(v || '')); };
module.exports.paramCase = function (v) { this.setVal(CASE.paramCase(v || '')); };
module.exports.pascalCase = function (v) { this.setVal(CASE.pascalCase(v || '')); };
module.exports.pathCase = function (v) { this.setVal(CASE.pathCase(v || '')); };
module.exports.sentenceCase = function (v) { this.setVal(CASE.sentenceCase(v || '')); };
module.exports.snakeCase = function (v) { this.setVal(CASE.snakeCase(v || '')); };
module.exports.swapCase = function (v) { this.setVal(CASE.swapCase(v || '')); };
module.exports.titleCase = function (v) { this.setVal(CASE.titleCase(v || '')); };
module.exports.upperCase = function (v) { this.setVal(CASE.upperCase(v || '')); };
module.exports.upperFirstCase = function (v) { this.setVal(CASE.ucFirstCase(v || '')); };

// Cases - Key
module.exports.upperCaseKey = function (v, k) { this.setKey(CASE.upperCase(k || '')) };
module.exports.camelCaseKey = function (v, k) { this.setKey(CASE.camelCase(k || '')); };
module.exports.constantCaseKey = function (v, k) { this.setKey(CASE.constantCase(k || '')); };
module.exports.dotCaseKey = function (v, k) { this.setKey(CASE.dotCase(k || '')); };
module.exports.headerCaseKey = function (v, k) { this.setKey(CASE.headerCase(k || '')); };
module.exports.lowerCaseKey = function (v, k) { this.setKey(CASE.lowerCase(k || '')); };
module.exports.lowerFirstCaseKey = function (v, k) { this.setKey(CASE.lcFirstCase(k || '')); };
module.exports.noCaseKey = function (v, k) { this.setKey(CASE.noCase(k || '')); };
module.exports.paramCaseKey = function (v, k) { this.setKey(CASE.paramCase(k || '')); };
module.exports.pascalCaseKey = function (v, k) { this.setKey(CASE.pascalCase(k || '')); };
module.exports.pathCaseKey = function (v, k) { this.setKey(CASE.pathCase(k || '')); };
module.exports.sentenceCaseKey = function (v, k) { this.setKey(CASE.sentenceCase(k || '')); };
module.exports.snakeCaseKey = function (v, k) { this.setKey(CASE.snakeCase(k || '')); };
module.exports.swapCaseKey = function (v, k) { this.setKey(CASE.swapCase(k || '')); };
module.exports.titleCaseKey = function (v, k) { this.setKey(CASE.titleCase(k || '')); };
module.exports.upperCaseKey = function (v, k) { this.setKey(CASE.upperCase(k || '')); };
module.exports.upperFirstCaseKey = function (v, k) { this.setKey(CASE.ucFirstCase(k || '')); };

// String Manipulation
module.exports.renameKey = function (v, k, p) { this.setKey(p); };
