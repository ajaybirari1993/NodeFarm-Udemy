// ------- GET STARTED -------
// const hello = "Hello Ajay!";
// console.log(hello);

// ------- FILE SYSTEM MODULE -------
const fs = require("fs");

// Reading from file
const content = fs.readFileSync("./input.txt", "utf-8");
console.log(content);

// // Writing to file
// const textToWrite = `This the new text to write on the file, added on ${new Date().toDateString()}`;
// fs.writeFileSync("./output.txt", textToWrite);
// console.log("File written");

// ------- BLOCKING AND NON-BLOCKING CODE -------
// Blocking code
// const fs = require("fs");
// console.log("Before reading");
// const content = fs.readFileSync("./input.txt", "utf-8");
// console.log(content);
// console.log("After reading");

// Non-Blocking, nested calls
// console.log("Before reading");
// fs.readFile("./fileName.txteee", "utf-8", (err, data1) => {
//   if (err) return console.log("Error, ⚠️");
//   console.log(data1);
//   // Using the output for 1st operation as input to next operation
//   fs.readFile(`./${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//   });
// });
// console.log("After reading");
