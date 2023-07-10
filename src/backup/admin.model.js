// admin.model.js
module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define('admins', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });

    return Admin;
};