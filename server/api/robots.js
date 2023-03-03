const router = require("express").Router();
const { Project } = require("../db");
const Robots = require("../db/models/Robots");

router.get("/", async (req, res, next) => {
  try {
    const robots = await Robots.findAll();
    res.send(robots);
  } catch (error) {
    next(error);
  }
});

router.get("/:robotId", async (req, res, next) => {
  try {
    const robot = await Robots.findByPk(req.params.robotId, {
      include: {
        model: Project,
      },
    });
    res.send(robot);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const robot = await Robots.create(req.body);
    console.log(req.body, "body");
    res.send(robot);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const robot = await Robots.findByPk(req.params.id);
    await robot.destroy();
    res.send(robot);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const robot = await Robots.findByPk(req.params.id);
    await robot.update(req.body);
    res.send(robot);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
