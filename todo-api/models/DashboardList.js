const mongoose = require("mongoose");
const { Schema } = mongoose;

const example = {
  user_id: "1231231",
  dashboards: [
    {
      title: "this is a dashboard",
      todos: [
        {
          title: "do something",
          description: "really important",
        },
        {
          title: "do something #2",
          description: "really important",
        },
      ],
    },
    {
      title: "this is a dashboard #2",
      todos: [
        {
          title: "do something",
          description: "really important",
        },
        {
          title: "do something #2",
          description: "really important",
        },
      ],
    },
  ],
};

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
