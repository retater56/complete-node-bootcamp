console.log("=========================================");
console.log("arguments: ", arguments);
console.log("=========================================");
console.log("require('module'): ", require("module").wrapper);
console.log("=========================================");

// module.exports
const C = require("./test-module-1");

const calculator1 = new C();
console.log("=========================================");
console.log("calculator1", calculator1.add(2, 5));
console.log("=========================================");

// exports
const { add } = require("./test-module-2");
console.log("=========================================");
console.log("calc2 add", add(2, 6));
console.log("=========================================");

// caching
require("./test-module-3")(); // log entire logic once because of caching
require("./test-module-3")();
