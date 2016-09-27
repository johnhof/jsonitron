'use strict';

const _ = require('lodash');

const TRAILING_DOT = /.$/;
const SEG_SPLIT = /\]\.|\.|\[|\]/i;

let toss = module.exports.toss = (msg) => {
  let error = new Error(msg);
  throw error
}

let checkpoint = module.exports.checkpoint = (condition, msg) => {
  if (!condition) {
    toss(msg);
  } else {
    return {
      and: checkpoint
    };
  }
}


let findMatchingPaths = module.exports.findMatchingPaths = (path, obj) => {
  let pathSplit = path.split('*');
  let segmentCount = path.split(SEG_SPLIT).length;

  // Base case
  if (!_.get(obj, pathSplit[0].replace(TRAILING_DOT, ''))) return [];

  let validPaths = [pathSplit.shift().replace(TRAILING_DOT, '')];
  let finalPaths = [];
  for (let basePath of validPaths) {
    let targetProp = _.get(obj, basePath);

    // Array wildcard
    if (_.isArray(targetProp)) {
      let length = targetProp.length;
      for (let i = 0; i < length; i++) validPaths.push(`${basePath}[${i}]`);

    // Object wildcard
    } else if (_.isPlainObject(targetProp)) {
      let keys = Object.keys(targetProp);
      let length = keys.length;
      for (let key of keys) validPaths.push(`${basePath}.${key}`);

    // Test for final match
    } else if (basePath.split(SEG_SPLIT).length === segmentCount) {
      finalPaths.push(basePath)
    }
  }

  return finalPaths;
}
