const Projects = require("../db/models/Projects");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const projects = await Projects.findAll();
    res.send(projects);
  } catch (error) {
    next(error);
  }
});

router.get("/:projectId", async (req, res, next) => {
  try {
    const project = await Projects.findByPk(req.params.projectId);
    res.send(project);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
