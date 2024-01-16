// models/Book.model.js
module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("Book", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,  
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        rating: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });

    return Book;
};
