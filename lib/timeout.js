'use strict';

const sleep = require('sleep');
const s = function () {
  //sleep.sleep(0.24) // sleep for 10 seconds
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 10); // 10 ms
}

const create = context => {
	return {
    BinaryExpression: node => {
      const fn = function() { return; }
      //setTimeout(3000, fn)
      console.log("before sleep")
      s()

      console.log("after sleep")
      if (true) {
        context.report(node, "before a setTimeout() in rule timeout");
      }
    },
	};
};

module.exports = {
	create,
	meta: {
    type: 'suggestion',
		docs: {
			url: '', //getDocsUrl(__filename)
		},
	}
};
