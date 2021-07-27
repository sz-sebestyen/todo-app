const mongoose = require("mongoose");
const { Schema } = mongoose;

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const DashboardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  todos: {
    type: [TodoSchema],
  },
});

const UserBoardSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  dashboards: {
    type: [DashboardSchema],
  },
});

const UserBoard = mongoose.model("userboard", UserBoardSchema);

module.exports = UserBoard;
