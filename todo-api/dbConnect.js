const mongoose = require("mongoose");

const mongooseOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
};

module.exports = () => {
  const { DB_CONNECTION } = process.env;

  mongoose
    .connect(DB_CONNECTION, mongooseOptions)
    .then(() => console.log("MongoDB Connected..."))
    .catch((error) => console.log("mongoose connection error: ", error));
};
