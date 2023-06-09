
// user.model.js
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        admin_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            
        },
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
        }
    });

    return User;
};