const { green, red } = require("chalk");
const { db, Project, Robot } = require("./server/db");

const robots = [
  {
    name: "SERAPHINE 99",
    fuelType: "gas",
    fuelLevel: 50,
    imageUrl:
      "https://i.ibb.co/hCy96Vf/Screenshot-2023-02-28-at-1-41-57-AM.png",
  },
  {
    name: "R2D2",
    fuelType: "gas",
    fuelLevel: 50,
    imageUrl:
      "https://i.ibb.co/w6TnqHG/Screenshot-2023-02-28-at-1-45-39-AM.png",
  },
  {
    name: "MEGATRON",
    fuelType: "gas",
    fuelLevel: 50,
    imageUrl:
      "https://i.ibb.co/kD8Xw3r/Screenshot-2023-02-28-at-1-45-49-AM.png",
  },
];

const projects = [
  {
    title: "MEGAMEGA 1",
    deadline: new Date("2022-03-25"),
    priority: 4,
    completed: false,
    description: "EXAMPLE DESCRIPTION",
  },
  {
    title: "Operation 2",
    deadline: new Date("2022-03-26"),
    priority: 5,
    completed: false,
    description: "EXAMPLE DESCRIPTION",
  },
  {
    title: "Operation 3",
    deadline: new Date("2022-03-27"),
    priority: 6,
    completed: false,
    description: "EXAMPLE DESCRIPTION",
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });

    // seed your database here!
    await Promise.all(
      robots.map((robot) => {
        return Robot.create(robot);
      })
    );

    await Promise.all(
      projects.map((project) => {
        return Project.create(project);
      })
    );

    console.log(green("Seeding success!"));

    const MEGATRON = await Robot.findOne({
      where: {
        name: "MEGATRON",
      },
    });

    const allProjects = await Project.findAll();
    const project1 = await Project.findByPk(1);
    console.log("project1", project1);

    console.log("AP", allProjects);
    // console.log("AP 0", allProjects[0]);
    // console.log("megaTron", MEGATRON);

    await MEGATRON.addProject(allProjects[0]);
    await MEGATRON.addProject(allProjects[1]);
    await MEGATRON.removeProject(project1); //deletes

    db.close();
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green("Seeding success!"));
      db.close();
    })
    .catch((err) => {
      console.error(red("Oh noes! Something went wrong!"));
      console.error(err);
      db.close();
    });
}
