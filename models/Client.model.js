// models/Client.model.js
module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("Client", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        PhoneNumber: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        Email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });
    
    return Client;
    
};