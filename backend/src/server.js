const express = require("express");
const router = express.Router();
const logger = require("morgan");
const bodyParser = require("body-parser");
const http = require("http");
const path = require("path");
const cors = require("cors");

const config = require("config");
const db = require("db");

const api = require("api");

const app = express();
app.use(cors());
global.__basedir = __dirname;
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "4MB" }));

// set the secret key variable for jwt
app.set("jwt-secret", config.secret);

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.use(express.static(path.join(__dirname, "build")));
app.use(express.static(path.join(__dirname, "public")));

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});
//결국 express인 app에 라우터를 넣어줘야한다. 그부분이다.
app.use("/", router);
app.use("/api", api); // 이부분을 빼먹어서 고생했다

app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err); //next가 이 다음 미들웨어를 실행 시킴
});

db.connect(); //db connection

const server = http.createServer(app);

server.listen("8082", () => console.log("server open!"));
