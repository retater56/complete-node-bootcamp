const fs = require("fs");
const superagent = require("superagent");

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) {
        return reject("File doesn`t exist");
      }

      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) {
        return reject("Error in writing file");
      }

      resolve("Success");
    });
  });
};

// ========================================= Async / Await

const getDogPic = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    // const res = await superagent.get(
    //   `https://dog.ceo/api/breed/${data}/images/random`
    // );

    // ========================================= Handle several Promises
    const res1Promise = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Promise = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Promise = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res = await Promise.all([res1Promise, res2Promise, res3Promise]);
    const images = res.map((recourse) => recourse.body.message).join("\n");

    // await writeFilePromise("dog-image.txt", res.body.message);
    await writeFilePromise("dog-image.txt", images);
    console.log("=========================================");
    // console.log("Image saved!", res.body.message);
    console.log("Image saved!", images);
    console.log("=========================================");
  } catch (err) {
    console.log("=========================================");
    console.log("Error ", err);
    console.log("=========================================");
  }
};

getDogPic();

// ========================================= Promises

// readFilePromise(`${__dirname}/dog.txt`)
//   .then((data) => {
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log("=========================================");
//     console.log("res.body.message", res.body.message);
//     console.log("=========================================");

//     return writeFilePromise("dog-image.txt", res.body.message);
//   })
//   .then(() => {
//     console.log("=========================================");
//     console.log("Image saved!");
//     console.log("=========================================");
//   })
//   .catch((err) => {
//     console.log("=========================================");
//     console.log("err in writing image source", err.message);
//     console.log("=========================================");
//   });

// ========================================= Callback hell

// fs.readFile(`${__dirname}/dog.txt`, "utf-8", (err, data) => {
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log("=========================================");
//       console.log("res.body.message", res.body.message);
//       console.log("=========================================");
//       fs.writeFile("dog-image.txt", res.body.message, (err) => {
//         if (err) {
//           console.log("=========================================");
//           console.log("err writing image", err);
//           console.log("=========================================");
//         }
//       });
//     })
//     .catch((err) => {
//       console.log("=========================================");
//       console.log("err getting image", err.message);
//       console.log("=========================================");
//     });
// });
