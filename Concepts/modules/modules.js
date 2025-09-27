// console.log(arguments);
console.log(require("module").wrapper);

// Module Exports
const C = require("./testModule1");
const calc1 = new C();
console.log(calc1.add(4, 3));
console.log(calc1.subtract(4, 3));

console.log("-------------Module Exports---------------------");

// Exports
const { add, subtract } = require("./testModule2");
console.log(add(5, 3));
console.log(subtract(5, 3));

console.log("------------Exports----------------------");

// Caching
require("./testModule3")();
require("./testModule3")();
require("./testModule3")();

console.log("------------Caching----------------------");
