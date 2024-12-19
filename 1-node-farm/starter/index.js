const fs = require("fs");

// Blocking execution
// const textInput = fs.readFileSync("./txt/input.txt", {
//   encoding: "utf-8",
// });
// console.log(textInput);

// const textOutput = `This is what we know about the avocado: ${textInput}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/textOutput", textOutput);
// console.log("File written!");

// Unblocking execution
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) {
    // change path to txt/start
    console.log("Error!");
    return;
  }

  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(`From data1: ${data1} -> ${data2}`);
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      console.log(data3);

      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("File has been written");
      });
    });
  });
});
console.log("first console");
