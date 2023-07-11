import express from "express";

const app = express();

const hostname = "localhost";
const port = 8010;

app.get("/", (req, res) => {
  res.end("<h1>Hello World</h1>");
});

app.listen(port, hostname, () => {
  console.log(`${hostname}:${port}`);
});
