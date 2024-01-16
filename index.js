require("dotenv").config();
const express = require('express');
const cors=require('cors');
const app = express();
const mariadb=require("mariadb");
const port = process.env.APP_PORT;

const swaggerUI = require('swagger-ui-express');
const yamljs = require('yamljs');

const swaggerDocument = yamljs.load('./docs/swagger.yaml');
app.use(express.json());
app.use(cors());



// const pool=mariadb.createPool({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASS,
//     database: process.env.NAME,
//     connectionLimit: 5
// })

/* const books=[
    {id:1,name:"1984", price:20, rating:10,},
    {id:2,name:"In Search of Lost Time", price:8.5, rating:10},
    {id:3,name:"Don Quixote", price:1.99, rating:10},
    {id:4,name:"The Great Gatsby", price:2.5, rating:10},
] */



require("./Routes/app_routes")(app);
console.log("./Routes/app_routes")

/* 
 app.get('/books', async (req, res) => {
    let connection 
    try{
        connection= await pool.getConnection()
        const rows= await connection.query("SELECT id, name from books")
        res.send(rows)

    }catch(error){
        throw error
    }finally{
        if(connection) return connection.end()
    }
   
}); */

/* app.get('/books/:id', (req, res) =>{
    if(typeof books[req.params.id - 1] === 'undefined'){
        return res.status(404).send({error: "Book not found"})
    }
    res.send(books[req.params.id - 1])
}) */

/* app.get('/clients/:id',(req,res)=>{
    if(typeof client[req.params.id -1] ==='undefined'){
        return res.status(404).send({error:"client was not found"})
    }
}) */


/* app.post('/books', (req, res) =>{
    if(!req.body.name || !req.body.price || !req.body.rating){
        return res.status(400).send({error: "One or all parameteres are missing"})
    }
    let book = {
        id: books.length + 1,
        name: req.body.name,
        price: req.body.price,
        rating: req.body.rating
    }
    books.push(book)

    res.status(201).location(`${getBaseUrl(req)}/games/${books.length}`).send(books)
});


app.delete('/books/:id', (req, res) =>{
    if(typeof books[req.params.id - 1] === 'undefined'){
        return res.status(404).send({error: "book not found"})
    };
    books.splice(req.params.id -1, 1);
    res.status(204).send({error: "No Content"});
}); */

 app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(port, async () => {console.log(`API up at: http://localhost:${port}`)});

function getBaseUrl(req){
    return req.connection && req.connection.encrypted ? 'https' : 'http' + `://${req.headers.host}`
}; 