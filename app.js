const express = require("express");
const app = express();
const fs = require("fs");
const random = require("random");

const VERSION_FILENAME = "./.git/refs/heads/main";

app.get("/", (req, res) => {
  console.log("[hello-world] root handler called");
  const randomVar = random.bernoulli(0.5);
  res
    .set("x-powered-by", "cyclic.sh")
    .send(`<h1>Hello World what's up!!!!!! HI KAM!?! bernoulli random var ${randomVar}</h1>`)
    .end();
});

app.use("*", (req, res) => {
  console.log("[hello-world] Star handler called");
  let version = "unknown";
  if (fs.existsSync(VERSION_FILENAME)) {
    version = fs.readFileSync(VERSION_FILENAME).toString().substr(0, 8);
  }
  res
    .set("x-powered-by", "cyclic.sh")
    .json({
      msg: "Not strickly part of the hello world but you get the picture.",
      version,
      at: new Date().toISOString(),
      method: req.method,
      hostname: req.hostname,
      ip: req.ip,
      path: req.params[0],
      query: req.query,
      headers: req.headers,
      cookies: req.cookies,
    })
    .end();
});

module.exports = app;
