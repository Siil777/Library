/* const { db } = require('../db');
const Connections = db.Connection;
const Book=db.books

// Get list of borrowingBooks
exports.getAll = async (req, res) => {
 const Connection=await Connections.findAll({
    include:{all:true},
    logging: console.log
 })
 console.log(Connection)
 let result=[]
 result=Connection.map((lp)=>{
    return {

        "bookName": lp.book.name,
        "Client":`$(lp.book.name)`

    }
 })
 res.send(result)

} */

/* exports.getAll = async (req, res) => {
    const Connection=await Connections.findAll({["id","bookId","clientId"]})
    res.send(Connection)
} */