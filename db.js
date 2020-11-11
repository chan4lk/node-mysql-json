var JsonField = require('./json_field');
var Sequelize = require('sequelize'),
  db,
  User;

db = new Sequelize('Test', 'root', '1qaz2wsx@', {
  dialect: 'mysql',
  logging: false,
});

User = db.define('User', {
  username: Sequelize.STRING,
  jsonField: JsonField(db, 'User', 'jsonField'),
});

module.exports = { User, db };
