const db = require("./db");
const Projects = require("./Projects");
const Robots = require("./Robots");

Robots.hasMany(Projects);
Projects.hasMany(Robots);

// module.exports = {
//   Projects,
//   Robots,
// };
