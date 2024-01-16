const booksController = require('../Controller/BooksController.js');
const clientsController = require('../Controller/ClientsController.js');

module.exports = (app) => {
    // Books routes
    app.route("/books")
        .get(booksController.getAll) //get all books list
        .post(booksController.createNew) //Create

    app.route("/books/:id")
        .get(booksController.getById) //get a book by id
        .put(booksController.updateById) //change by id
        .delete(booksController.deleteById) // delete a book

    // Clients routes
    app.route("/clients")
        .get(clientsController.getAllClients);
}
