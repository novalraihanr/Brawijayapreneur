module.exports = (sequelize, Sequelize) => {
    
    const Roles = sequelize.define('roles', {
        role: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
    })

    return Roles
}