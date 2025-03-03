const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solution 1
  //   fs.readFile("test-file.txt", (err, data) => {
  //     if (err) {
  //       console.log("=========================================");
  //       console.log("error: ", err);
  //       console.log("=========================================");
  //     }
  //     res.end(data);
  //   });
  // Solution 2: Streams
  //   const readableStream = fs.createReadStream("test-file.txt");
  //   //   const readableStream = fs.createReadStream("test1-file.txt"); // Handle error
  //   readableStream.on("data", (chunk) => {
  //     res.write(chunk);
  //   });
  //   readableStream.on("error", (err) => {
  //     console.log("=========================================");
  //     console.log("Error", err);
  //     console.log("=========================================");
  //     res.statusCode = 500;
  //     res.end("Internal error");
  //   });
  //   readableStream.on("end", () => {
  //     console.log("=========================================");
  //     console.log("readableStream finished");
  //     console.log("=========================================");
  //     res.end();
  //   });

  // Solution 3: Streams with pipe
  const readableStream = fs.createReadStream("test-file.txt");
  readableStream.pipe(res)
});

server.listen(8000, () => {
  console.log("=========================================");
  console.log("Waiting for requests");
  console.log("=========================================");
});
