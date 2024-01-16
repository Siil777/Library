// BooksController
const { db } = require('../db');
const Books = db.books;

// Get list of books
exports.getAll = async (req, res) => {
    const books = await Books.findAll({ attributes: ["name"] });
    res.send(books);
};
// Get specific book by id
exports.getById = async (req, res) => {
    const book = await Books.findByPk(req.params.id);
    if (!book) {
        res.status(404).send({ "Error": "Book not found" });
        return;
    }
    res.send(book);
};

// Create a new book
exports.createNew = async (req, res) => {
    console.log(req.body);
    let book;
    try {
        book = await Books.create(req.body);
    } catch (error) {
        if (error instanceof db.Sequelize.ValidationError) {
            console.log(error);
            res.status(400).send({ "error": "Invalid input" });
        } else {
            console.log("BooksCreate", error);
            res.status(500).send({ "Error": "Server error, try again later" });
        }
        return;
    }
    res
        .status(201)
        .location(`${getBaseUrl(req)}/books/${book.id}`)
        .json(book);
};

exports.deleteById = async (req, res) => {
    let result;
    try {
        result = await Books.destroy({ where: { id: req.params.id } });
    } catch (error) {
        console.log("booksCreateDelete", error);
        res.status(500).send({ "error": "server error, try again later" });
        return;
    }

    if (result === 0 || result === undefined) {
        res.status(404).send({ "error": "book not found" });
        return;
    }
    res.status(204).send()
};

exports.updateById=async(req,res)=>{
    let result=
    delete(req.body.id)
    try{
        result=await Books.update(req.body, {where: {id:req.params.id}})
    }catch(error){
        console.log("BooksUpdate",error)
        res.status(500).send({ "error": "server error, try later again"})
        return
    }
    if(result===0 || result===undefined){
        res.status(404).send({"error":"book not found"})
    }
    const book=await Book.findByPk(res.params.id)
    res.status(200)
        .location(`${getBaseUrl(req)}/books/${book.id}`)
        .json(book)

}

exports.deleteById = async (req, res) => {
    let result;
    try {
        result = await Books.destroy({ where: { id: req.params.id } });
    } catch (error) {
        console.log("booksCreateDelete", error);
        res.status(500).send({ "error": "server error, try again later" });
        return;
    }

    if (result === 0 || result === undefined) {
        res.status(404).send({ "error": "book not found" });
        return;
    }
    res.status(204).send()
};

const getBaseUrl = (request) => {
    return (request.connection && request.connection.encrypted ? "https" : "http") +
        `://${request.headers.host}`;
};
