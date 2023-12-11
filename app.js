const express = require('express');
const app = express();
const db = require('./db'); // Import the database connection module
const cors = require('cors'); // Import the 'cors' package

// Middleware to enable CORS
app.use(cors());

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON data
app.use(express.json());

// Create a new book
app.post('/books', (req, res) => {
    const {title, author, publicationYear } = req.body;
    console.log('Received data:', { title, author, publicationYear });
    //if (!title || !author || !publicationYear) {
   //     return res.status(400).json({ error: 'Please provide all required fields.' });
   // }

    const sql = 'INSERT INTO books (title, author, publicationYear) VALUES (CAST(? AS VARCHAR(255)), CAST(? AS VARCHAR(255)), CAST(? AS INT))';

    const values = [title, author, publicationYear];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error creating the book');
        }

        res.status(201).send('Book has been uploaded');
    });
});

// Fetch all books
app.get('/books', (req, res) => {
    const sql = 'SELECT * FROM Books';

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error fetching books');
        }

        res.json(results);
    });
});

// Update a book
app.put('/books/:id', (req, res) => {
    const { title, author, publicationYear } = req.body;
    const bookId = req.params.id;

    const sql = 'UPDATE Books SET title = ?, author = ?, publicationYear = ? WHERE bookId = ?';
    const values = [title, author, publicationYear, bookId];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error updating the book');
        }

        res.send('Book updated successfully');
    });
});

// Delete a book
app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;

    const sql = 'DELETE FROM Books WHERE bookId = ?';

    db.query(sql, [bookId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error deleting the book');
        }

        res.send('Book deleted successfully');
    });
});

// Create a new book review
app.post('/book-reviews', (req, res) => {
    const { bookId, rating, review } = req.body;

    const sql = 'INSERT INTO book_reviews (bookId, rating, review) VALUES (?, ?, ?)';
    const values = [bookId, rating, review];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error creating the review');
        }

        res.status(201).send('Review created successfully');
    });
});

// Fetch all book reviews
app.get('/book-reviews', (req, res) => {
    const sql = 'SELECT * FROM book_reviews';

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error fetching reviews');
        }

        res.json(results);
    });
});

// Update a book review
app.put('/book-reviews/:id', (req, res) => {
    const { rating, review } = req.body;
    const bookId = req.params.id;

    const sql = 'UPDATE book_reviews SET rating = ?, review = ? WHERE bookId = ?';
    const values = [rating, review, bookId];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error updating the review');
        }

        res.send('Review updated successfully');
    });
});

// Delete a book review
app.delete('/book-reviews/:id', (req, res) => {
    const bookId = req.params.id;

    const sql = 'DELETE FROM book_reviews WHERE bookId = ?';

    db.query(sql, [bookId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error deleting the review');
        }

        res.send('Review deleted successfully');
    });
});

const port = 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

