
// article.model.js
module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define('articles', {
        id_article: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        author: {
            type: Sequelize.STRING,
            allowNull: true
        },
        tags : {
            type: Sequelize.STRING,
            allowNull: false
        },
        file_url: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });

    return Article;
};