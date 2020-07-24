const express = require("express");
const bodyParser = require("body-parser");
const utils = require("./utils.js");
const globals = require("./globals");
const app = express();
const port = 5000;

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(bodyParser.json());

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

app.post("/login", (req, res) => {
  if (utils.authorize(req.body.userName, req.body.password)) {
    res.send({ result: globals.authorizationStatuses.AUTHORIZED });
  } else {
    res.send({ result: globals.authorizationStatuses.UNAUTHORIZED });
  }
});

app.get("/connectedUsers", (req, res) => {
  res.send(utils.getConnectedUsers());
});
