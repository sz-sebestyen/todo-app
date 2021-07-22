const mongoose = require("mongoose");
const { Schema } = mongoose;

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true,
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

const DashboardListSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  dashboards: {
    type: [DashboardSchema],
  },
});

const DashboardList = mongoose.model("dashboardlist", DashboardListSchema);

module.exports = DashboardList;
