var JsonField = require('./json_field');
const { Sequelize } = require('sequelize');

/**
 * @type {Sequelize}
 */
var db = new Sequelize('Test', 'root', '1qaz2wsx@', {
  dialect: 'mysql',
  logging: false,
});

var User = db.define('User', {
  username: Sequelize.STRING,
  jsonField: JsonField(db, 'User', 'jsonField'),
});

module.exports = { User, db };
