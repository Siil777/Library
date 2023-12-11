const express = require('express');
const app = express();
const port = 3030;
const swaggerUI = require('swagger-ui-express');
const yamljs = require('yamljs');

const swaggerDocument = yamljs.load('./docs/swagger.yaml');
app.use(express.json());


const books=[
    {id:1,name:"1984",price:20, rating:10,},
    {id:2,name:"In Search of Lost Time",price:8.5, rating:10},
    {id:3,name:"Don Quixote",price:1.99, rating:10},
    {id:4,name:"The Great Gatsby",price:2.5, rating:10},


]

app.get('/books',(req, res)=>{
    res.send([books])
})

app.get('/books/:id',(req,res)=>{
    if(typeof books[req.params.id -1]==='undefined')
    {
        return res.status(404).send({error:"book is not found"})
    }
    res.send(books[req.params.id -1])
})

app.post('/books', (req, res, next) => {
    if (!req.body.name || !req.body.price || !req.body.rating) {
        return res.status(400).send({ error: "One or all parameters are missing" });
    }

    const book = {
        id: books.length + 1,
        name: req.body.name,
        price: req.body.price,
        rating: req.body.rating
    };

    books.push(book);

    res.status(201)
        .location(`${getBaseUrl(req)}/books/${books.length}`)
        .json(book);
});

app.delete('/books/:id',(req,res)=>{
    if (typeof books[req.params.id -1]===
    'undefined')
    {
        return res.status(404).send({error:"book was not found"})
    }
    books.splice(req.params.id -1, 1)
    res.status(204).send({error:"No content"})
})



app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`);
});

function getBaseUrl(req) {
    return req.connection && req.connection.encrypted ? 'https' : 'http' + `://${req.headers.host}`;
}