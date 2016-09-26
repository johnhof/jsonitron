'user strict';

let toss = module.exports.toss = (msg) => {
  let error = new Error(msg);
  throw error
}

let checkpoint = (condition, msg) => {
  if (!condition) {
    toss(msg);
  } else {
    return {
      and: checkpoint
    };
  }
}
