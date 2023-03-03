const db = require("./database");
const Project = require("./models/Projects");
const Robot = require("./models/Robots");

Project.belongsToMany(Robot, { through: "tasks" });
Robot.belongsToMany(Project, { through: "tasks" });

module.exports = {
  db,
  Project,
  Robot,
};
