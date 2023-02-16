const db = require("../database");
const Projects = require("./Projects");
const Robots = require("./Robots");

Projects.belongsToMany(Robots);
Robots.belongsToMany(Projects);

module.exports = {
  db,
  Projects,
  Robots,
};
