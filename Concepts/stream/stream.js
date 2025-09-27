const fs = require("fs");
const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
  // Solution 1 : Using readFile
  // Reading from file and sending as response
  // fs.readFile("./stream-test.txt", "utf-8", (err, data) => {
  //   if (err) console.log("Error, ⚠️");
  //   res.end(data);
  // });

  // Solution 2 : Using Streams
  // const readable = fs.createReadStream("./stream-test.txt");

  // readable.on("data", (chunk) => {
  //   res.write(chunk);
  // });

  // readable.on("end", () => {
  //   res.end();
  // });

  // readable.on("error", (err) => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end("File not found");
  // });

  // Solution 3 : Using pipe to handle the backpressure issue and also reduce the code
  const readable = fs.createReadStream("./stream-test.txt");
  readable.pipe(res);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on the port : 8000");
});
