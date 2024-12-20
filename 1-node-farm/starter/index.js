const fs = require("fs");
const http = require("http");

// FILES ////////////////////////////////////////////////////////////////

// Blocking execution
// const textInput = fs.readFileSync("./txt/input.txt", {
//   encoding: "utf-8",
// });
// console.log(textInput);

// const textOutput = `This is what we know about the avocado: ${textInput}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/textOutput", textOutput);
// console.log("File written!");

// Unblocking execution
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if (err) {
//     // change path to txt/start
//     console.log("Error!");
//     return;
//   }

//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(`From data1: ${data1} -> ${data2}`);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);

//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("File has been written");
//       });
//     });
//   });
// });
// console.log("first console");

// SERVER ////////////////////////////////////////////////////////////////

// Called only once even if route refreshed
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8"); // __dirname === './'

const server = http.createServer((req, res) => {
  console.log("req", req.url);

  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("Response from overview");
  } else if (pathName === "/product") {
    res.end("Response from product");
  } else if (pathName === "/api") {
    // fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
    //   const productData = JSON.parse(data);
    //   console.log("productData", productData);
    //   res.writeHead(200, {
    //     "content-type": "application/json",
    //   });
    //   res.end(data);
    // });

    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello from own header",
    });
    res.end("<h1>Page Not Found</h1>");
  }
});

server.listen(8000, () => {
  console.log("Start listening on port 8000");
});
