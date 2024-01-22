/* module.exports = (sequelize, Sequelize, Book, Client) => {
    const Connection = sequelize.define("Connection", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        bookId: {
            type: Sequelize.INTEGER,
            references: {
                model: Book,
                key: "id",
            }
        },
        clientId: {
            type: Sequelize.INTEGER,
            references: {
                model: Client,
                key: "id"
            }
        }
    });

    Book.belongsToMany(Client, {through: Connection})
    Client.belongsToMany(Book, {through: Connection})
    Book.hasMany(Connection)
    Connection.belongsTo(Book)
    Client.hasMany(Connection)
    Connection.belongsTo(Client) 

    return Connection;
}; */

