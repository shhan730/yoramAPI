const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
  logging: false,
});

const User = sequelize.define('User', {
  socialID: {
    type: Sequelize.STRING,
    unique: true
  },
  nickname: {
    type: Sequelize.STRING,
    unique: false
  },
  profileImageUrl: {
    type: Sequelize.STRING,
    unique: false
  },
  platformName: {
    type: Sequelize.STRING,
    unique: false
  }

})

module.exports = {Sequelize, sequelize, User};