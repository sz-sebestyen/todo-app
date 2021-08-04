const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("express-async-errors");

const errorHandler = require("./middlewares/errorHandler");
const identifyUser = require("./middlewares/identifyUser");

const testRouter = require("./routes/testRouter");
const todoRouter = require("./routes/todoRouter");
const loginRouter = require("./routes/loginRouter");
const codeRouter = require("./routes/codeRouter");
const authCheckRouter = require("./routes/authCheckRouter");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/test", testRouter);
app.use("/api/todo", [identifyUser, todoRouter]);
app.use("/api/login", loginRouter);
app.use("/api/code", codeRouter);
app.use("/api/authcheck", [identifyUser, authCheckRouter]);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandler);

module.exports = app;
