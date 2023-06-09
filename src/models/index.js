// index.js
const db = require('../config/database');

db.roles = require('./roles.model')(db.sequelize, db.Sequelize);
db.admin = require('./admin.model')(db.sequelize, db.Sequelize);
db.user = require('./user.model')(db.sequelize, db.Sequelize);

db.admin.hasMany(db.user, {
    foreignKey: 'admin_id'
});
db.user.belongsTo(db.admin, {
    foreignKey: 'admin_id'
});

module.exports = db;