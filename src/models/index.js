// index.js
const db = require('../config/database');

db.user = require('./user.model')(db.sequelize, db.Sequelize);
db.article = require('./article.model')(db.sequelize, db.Sequelize);

module.exports = db;