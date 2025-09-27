const fs = require("fs");
const superagent = require("superagent");

// <------------ Callback Hell (Without Promise)------------>

// fs.readFile(`${__dirname}/dog.txt`, "utf-8", (err, data) => {
//   console.log(`Breed: ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {

//       fs.writeFile(`${__dirname}/dog-img.txt`, res.body.message, (err) => {
//         if (err) return console.log(err.message);
//         console.log("Random dog image saved to file!");
//       });
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });

// <------------ With Promise ------------>
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) reject("I could not find that file 😢");
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not write file 😢");
      resolve("success");
    });
  });
};

const fileName = `${__dirname}/dog.txt`;

// readFilePro(fileName)
//   .then((res) => {
//     console.log(`Breed: ${res}`);
//     const url = `https://dog.ceo/api/breed/${res}/images/random`;

//     return superagent.get(url);
//   })
//   .then((res) => {
//     const imgUrl = res.body.message;
//     console.log(imgUrl);
//     return writeFilePro(`${__dirname}/dog-img.txt`, imgUrl);
//   })
//   .then((res) => console.log(res))
//   .catch((err) => {
//     console.log(err.message);
//   });

// <------------ With Async Await ------------>
const getDogPic = async () => {
  try {
    const data = await readFilePro(fileName);
    console.log(`Breed: ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePro(`${__dirname}/dog-img.txt`, res.body.message);
    console.log("Random dog image saved to file!");
  } catch (error) {
    throw error;
  }
  return "2. Ready 🐶";
};

// <------------ Calling the Async Function ------------>
// console.log("1. Will get dog pics!");
// getDogPic()
//   .then((res) => {
//     console.log(res);
//     console.log("3. Done getting dog pics! ✅");
//   })
//   .catch((err) => {
//     console.log("Error in getting dog pics! ❌");
//   });

// <------------ With Async Await & IIFE ------------>
(async () => {
  try {
    console.log("1. Will get dog pics!");
    const res = await getDogPic();
    console.log(res);
    console.log("3. Done getting dog pics! ✅");
  } catch (error) {
    console.log(error.message ?? error);
    console.log("Error in getting dog pics! ❌");
  }
})();
