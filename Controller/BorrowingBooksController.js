const { db } = require('../db');
const BorrowBooks = db.Borrowingbook;

// Get list of borrowingBooks
exports.getAllBorrowing = async (req, res) => {
    try {
        const borrowingBooks = await BorrowBooks.findAll({ attributes: ["id_book", "id_client"] });
        res.send(borrowingBooks);
    } catch (error) {
        console.error("Error fetching borrowingBooks:", error);
        res.status(500).send({ "error": "Server error, try again later" });
    }
};

// Get specific Borrowingbook by id
exports.getByIdBorrowing = async (req, res) => {
    try {
        const borrowingBook = await BorrowBooks.findByPk(req.params.id);
        if (!borrowingBook) {
            res.status(404).send({ "error": "Book not found" });
            return;
        }
        res.send(borrowingBook);
    } catch (error) {
        console.error("Error fetching borrowingBook by id:", error);
        res.status(500).send({ "error": "Server error, try again later" });
    }
};

// Create a new Borrowingbook
exports.createNewBorrowing = async (req, res) => {
    try {
        const borrowingBook = await BorrowBooks.create(req.body);
        res
            .status(201)
            .location(`${getBaseUrl(req)}/borrowing/${borrowingBook.id}`)
            .json(borrowingBook);
    } catch (error) {
        if (error instanceof db.Sequelize.ValidationError) {
            console.error(error);
            res.status(400).send({ "error": "Invalid input" });
        } else {
            console.error("Error creating borrowingBook:", error);
            res.status(500).send({ "error": "Server error, try again later" });
        }
    }
};

// Delete by Id
exports.deleteByIdBorrowing = async (req, res) => {
    try {
        const result = await BorrowBooks.destroy({ where: { id: req.params.id } });
        if (result === 0 || result === undefined) {
            res.status(404).send({ "error": "Borrowing book not found" });
            return;
        }
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting borrowingBook by id:", error);
        res.status(500).send({ "error": "Server error, try again later" });
    }
};

// Update by Id
exports.updateByIdBorrowing = async (req, res) => {
    try {
        const result = await BorrowBooks.update(req.body, { where: { id: req.params.id } });
        if (result[0] === 0 || result === undefined) {
            res.status(404).send({ "error": "Borrowing book not found" });
            return;
        }

        const updatedBorrowingBook = await BorrowBooks.findByPk(req.params.id);
        res.status(200)
            .location(`${getBaseUrl(req)}/borrowing/${updatedBorrowingBook.id}`)
            .json(updatedBorrowingBook);
    } catch (error) {
        console.error("Error updating borrowingBook by id:", error);
        res.status(500).send({ "error": "Server error, try again later" });
    }
};

const getBaseUrl = (request) => {
    return (request.connection && request.connection.encrypted ? "https" : "http") +
        `://${request.headers.host}`;
};
