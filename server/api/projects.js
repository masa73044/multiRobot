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

module.exports = router;
