
// user.model.js
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        role: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return User;
};