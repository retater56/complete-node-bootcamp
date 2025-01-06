const fs = require("fs");
const http = require("http");
const url = require("url");

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

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCT_NAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%IMAGE%}/g, product.image);

  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }

  return output;
};

const tempOverviewPage = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProductPage = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8"); // __dirname === './'
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "content-type": "text/html",
    });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");

    // const overviewPage = replaceOverviewTemplate(tempOverviewPage, cardsHtml);
    const overviewPage = tempOverviewPage.replace(
      /{%PRODUCTS_LIST%}/g,
      cardsHtml
    );

    res.end(overviewPage);

    // Product page
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "content-type": "text/html",
    });

    const product = dataObj[query.id];
    const output = replaceTemplate(tempProductPage, product);

    res.end(output);

    // API
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(data);

    //Not Found
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
