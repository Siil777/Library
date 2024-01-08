const express = require('express');
const cors=require('cors');
const app = express();
const port = 8080
const swaggerUI = require('swagger-ui-express');
const yamljs = require('yamljs');

const swaggerDocument = yamljs.load('./docs/swagger.yaml');
app.use(express.json());
app.use(cors());



const books=[
    {id:1,name:"1984", price:20, rating:10,},
    {id:2,name:"In Search of Lost Time", price:8.5, rating:10},
    {id:3,name:"Don Quixote", price:1.99, rating:10},
    {id:4,name:"The Great Gatsby", price:2.5, rating:10},
]

app.get('/books/:id', (req, res) =>{
    if(typeof books[req.params.id - 1] === 'undefined'){
        return res.status(404).send({error: "Book not found"})
    }
    res.send(books[req.params.id - 1])
})

app.get('/books', (req, res) => {
    res.send(books);
});

app.post('/books', (req, res) =>{
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
});

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(port, () => {console.log(`API up at: http://localhost:${port}`)});

function getBaseUrl(req){
    return req.connection && req.connection.encrypted ? 'https' : 'http' + `://${req.headers.host}`
};