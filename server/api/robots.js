const Robots = require("../db/models/Robots");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const robots = await Robots.findAll();
    res.send(robots);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
