const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log("=========================================");
  console.log("newSale handled");
  console.log("=========================================");
});

myEmitter.on("newSale", () => {
  console.log("=========================================");
  console.log("newSale handled 2 times");
  console.log("=========================================");
});

myEmitter.on("newSale", (stock) => {
  console.log("=========================================");
  console.log("newSale handled 3 times with argument", stock);
  console.log("=========================================");
});

myEmitter.emit("newSale", 56);

// =========================================

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("=========================================");
  console.log("Request received");
  console.log("=========================================");
  res.end("Response");
});

server.on("request", (req, res) => {
  console.log("=========================================");
  console.log("Another request received");
  console.log("=========================================");
});

server.on("close", () => {
  console.log("=========================================");
  console.log("Server closed");
  console.log("=========================================");
});

server.listen(8000, () => {
  console.log("=========================================");
  console.log("Waiting for requests...");
  console.log("=========================================");
});
