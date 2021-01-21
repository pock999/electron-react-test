const Sequelize = require('sequelize');

module.exports = {
  attributes: {
    account: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: Sequelize.STRING,
  },
  associations() {},
  options: {
    paranoid: true,
  },
};
