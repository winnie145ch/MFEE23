const http = require("http");
const fs = require("fs");

function myReadfFile(file_data) {
  return new promises((resolve, rejects) => {
    fs.readFile(file_data, (error, data) => {
      if (error) return rejects(error);
      resolve(data);
    });
  })
}

const server = http.createServer((req, res) => {
  // fs.readFile(__dirname + "/headers.txt", (error, data) => {
  //   if (error) {
  //     console.log(error);
  //     res.end("error 錯誤");
  //   } else {
      res.writeHead(200, {
        "Content-Type": "application/json; charset = utf-8",
      });
      res.end(data);
    }
  });
});

server.listen(3000);
