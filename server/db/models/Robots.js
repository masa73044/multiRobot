const Sequelize = require("sequelize");
const db = require("../database");

module.exports = db.define("robot", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  fuelType: {
    type: Sequelize.ENUM("gas, diesel, electric"),
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
    defaultValue: "https://via.placeholder.com/200x200",
  },
});
