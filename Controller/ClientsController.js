 //Clients controller
const { db } = require('../db')
const Clients=db.clients;

//Get list of all clients
/* exports.getAllClients = async (req, res) => {
    const clients = await Clients.findAll({ attributes: ["Name"] });
    res.send(clients);
};
//Get specific book by id
exports.getByIdClients = async (req, res) => {
    const clients = await Clients.findByPk(req.params.id);
    if (!clients) {
        res.status(404).send({ "Error": "Book not found" });
        return;
    }
    res.send(clients);
};  */

// Create a new book
/* exports.createNewClients = async (req, res) => {
    console.log(req.body);
    let client;
    try {
        client = await Clients.create(req.body);
    } catch (error) {
        if (error instanceof db.Sequelize.ValidationError) {
            console.log(error);
            res.status(400).send({ "error": "Invalid input" });
        } else {
            console.log("ClientCreate", error);
            res.status(500).send({ "Error": "Server error, try again later" });
        }
        return;
    }
    res
        .status(201)
        .location(`${getBaseUrl(req)}/clients/${client.id}`)
        .json(client);
}; */

 exports.deleteByIdClients = async (req, res) => {
    let result;
    try {
        result = await Clients.destroy({ where: { id: req.params.id } });
    } catch (error) {
        console.log("clientCreateDelete", error);
        res.status(500).send({ "error": "server error, try again later" });
        return;
    }

    if (result === 0 || result === undefined) {
        res.status(404).send({ "error": "client not found" });
        return;
    }
    res.status(204).send()
}; 

/*  exports.updateByIdClients=async(req,res)=>{
    let result;
    try{
        result=await Clients.update(req.body, {where: {id:req.params.id}})
    }catch(error){
        console.log("clientUpdate",error)
        res.status(500).send({ "error": "server error, try later again"})
        return
    }
    if(result===0 || result===undefined){
        res.status(404).send({"error":"client not found"})
    }
    const book=await Clients.findByPk(res.params.id)
    res.status(200)
        .location(`${getBaseUrl(req)}/clients/${clients.id}`)
        .json(book)

} */

const getBaseUrl = (request) => {
    return (request.connection && request.connection.encrypted ? "https" : "http") +
        `://${request.headers.host}`;
}; 