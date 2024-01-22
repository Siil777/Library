// db.js
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.NAME,
    process.env.USER,
    process.env.PASS,
    {
        host: process.env.HOST,
        dialect: "mariadb",
        define: {
            timestamps: false
        },
        logging: (msg) => {
            console.log(`Sequelize: ${msg}`);
        },
    }
);


const db={}
db.Sequelize=Sequelize
db.sequelize=sequelize
db.books=require("./models/Book.model")(sequelize,Sequelize)
db.clients=require("./models/Client.model")(sequelize,Sequelize)
db.Borrowingbook=require("./models/BorrowingBook.model")(sequelize,Sequelize)

// db.Connection=require("./models/Connection.model")(sequelize,Sequelize)
module.exports=db

const Sync = async () => {
    await sequelize.sync({ alter: true });
};

module.exports={db,Sync};



