const router = require("express").Router();
const Projects = require("../db/models/Projects");
const Robot = require("../db/models/Robots");

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
    const project = await Projects.findByPk(req.params.projectId, {
      include: {
        model: Robot,
      },
    });

    res.send(project);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const project = await Projects.create(req.body);
    res.send(project);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const project = await Projects.findByPk(req.params.id);
    await project.destroy();
    res.send(project);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const project = await Projects.findByPk(req.params.id);
    res.send(await project.update(req.body));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
