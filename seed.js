const { green, red } = require("chalk");
const { db, Project, Robot } = require("./server/db");
const Robots = require("./server/db/models/Robots");

const robots = [
  {
    name: "MEGATRON",
    fuelType: "gas",
    fuelLevel: 50,
    imageUrl:
      "https://target.scene7.com/is/image/Target/GUEST_3d2a8073-36e6-4cec-8c8c-872639105820?wid=488&hei=488&fmt=pjpeg",
  },
  {
    name: "R2D2",
    fuelType: "gas",
    fuelLevel: 50,
    imageUrl:
      "https://target.scene7.com/is/image/Target/GUEST_9766bfa7-3fcb-4f4c-9576-15e17ccc1044?wid=488&hei=488&fmt=pjpeg",
  },
  {
    name: "KNIGHTMARE",
    fuelType: "gas",
    fuelLevel: 50,
    imageUrl: "https://images.heb.com/is/image/HEBGrocery/000121396",
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });

    // seed your database here!
    await Promise.all(
      robots.map((robot) => {
        return Robots.create(robot);
      })
    );

    console.log(green("Seeding success!"));
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
