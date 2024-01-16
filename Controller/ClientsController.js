 //Clients controller
const { db } = require('../db')
const Clients=db.clients;

//Get list of all clients
exports.getAllClients=async(req, res)=>{
    const client=await Clients.findAll({ atributes: ["Name"]});
    res.send(client)
}  

