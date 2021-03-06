const errorHandler = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  console.log(err);

  // render the error page
  res.status(err.status || 500).send("error");
};

module.exports = errorHandler;
