// models/Client.model.js
module.exports = (sequelize, Sequelize) => {
    const BorrowingBook = sequelize.define("Borrowing", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_book: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        id_client: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        
    }); 
    return BorrowingBook;
};