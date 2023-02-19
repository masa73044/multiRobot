const db = require("../database");
const Projects = require("./Projects");
const Robots = require("./Robots");

Projects.belongsToMany(Robots, { through: "tasks" });
Robots.belongsToMany(Projects, { through: "tasks" });

module.exports = {
  db,
  Projects,
  Robots,
};
