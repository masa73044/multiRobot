const router = require("express").Router();
const Project = require("../db/models/Projects");
const Robot = require("../db/models/Robots");

router.put("/:id", async (req, res, next) => {
  try {
    const robot = await Robot.findByPk(req.params.id);
    // const project = await Project.findByPk(req.body);
    // await robot.removeProject(project);

    // const project = await Projects.findByPk(req.params.req.body.projectId);
    // console.log(project, "project");
    // await robot.removeProject(project);

    // if (req.body.length === 1) {
    //   robot.removeProject(project);
    //   res.send(robot);
    // } else {
    //   await robot.update(req.body);
    //   res.send(robot);
    // }

    res.send(robot);
  } catch (error) {
    next(error);
  }
});
// try to query for through,
// test on seed with reverse

module.exports = router;
