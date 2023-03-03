const Sequelize = require("sequelize");
const db = require("../database");

const Robot = db.define("robot", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  fuelType: {
    type: Sequelize.ENUM("gas", "diesel", "electric"),
    defaultValue: "electric",
  },
  fuelLevel: {
    type: Sequelize.DECIMAL,
    validate: {
      min: 0,
      max: 100,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      "https://i.ibb.co/X39mNct/Screenshot-2023-02-28-at-1-46-05-AM.png",
  },
});

module.exports = Robot;
