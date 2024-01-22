const booksController = require('../Controller/BooksController.js');
const clientsController = require('../Controller/ClientsController.js');
const BorrowingController = require('../Controller/BorrowingBooksController.js');


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
    .get(clientsController.getAllClients) //get all books list
     .post(clientsController.createNewClients) //Create

    app.route("/clients/:id")
     .get(clientsController.getByIdClients) //get a book by id 
    .put(clientsController.updateByIdClients) //change by id */
    .delete(clientsController.deleteByIdClients) //  */delete a book */ getByIdBorrowing

    app.route("/borrowing")
    .get(BorrowingController.getAllBorrowing)
    .post(BorrowingController.createNewBorrowing)

    app.route("/borrowing/:id")
    .get(BorrowingController.getByIdBorrowing) 
    .put(BorrowingController.updateByIdBorrowing) 
    .delete(BorrowingController.deleteByIdBorrowing) 


   /*  app.route("/Connection")
        .get(BorrowingController.getAll) */
}