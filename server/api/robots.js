const router = require("express").Router();
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
    const robot = await Robots.findByPk(req.params.robotId);
    console.log(robot, "robo");
    res.send(robot);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
