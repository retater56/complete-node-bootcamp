const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();
// process.env.UV_THREADPOOL_SIZE = 1; // default is 4

setTimeout(() => {
  console.log("Timer 1 is done!");
}, 0);

setImmediate(() => {
  console.log("Immediate 1 is done!");
});

fs.readFile("test-file.txt", () => {
  console.log("I/O finished!");

  console.log("=========================================");
  console.log("Running in Event Loop. Functions are executed in callback");
  console.log("=========================================");

  setTimeout(() => {
    console.log("Timer 2 is done!");
  }, 0);

  setTimeout(() => {
    console.log("Timer 3 is done!");
  }, 3000);

  setImmediate(() => {
    console.log("Immediate 1 is done!");
  });

  process.nextTick(() => {
    console.log("Next Tick"); // Microtask executed before other code after adding
  });

  crypto.pbkdf2S("password", "salt", 10000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password encrypted");
  }); // pbkdf2Sync will block other code. Don't receive callback as argument
  crypto.pbkdf2("password", "salt", 10000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password encrypted");
  });
  crypto.pbkdf2("password", "salt", 10000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password encrypted");
  });
  crypto.pbkdf2("password", "salt", 10000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password encrypted");
  });
});

console.log("Hello from the top-level code!");
