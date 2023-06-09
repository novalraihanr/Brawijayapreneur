const { db } = require('../models')
const User = db.roles

sequelize.sync().then(() => {
    console.log('Roles Created!');

    Roles.create({
        role: "User"
    }).then(res => {
        console.log(res)
    }).catch((error) => {
        console.error('Failed to create a new record : ', error);
    });

    Roles.create({
        role: "Admin"
    }).then(res => {
        console.log(res)
    }).catch((error) => {
        console.error('Failed to create a new record : ', error);
    });

}).catch((error) => {
    console.error('Unable to create table : ', error);
});