
CREATE TABLE books (
                       bookId INT PRIMARY KEY AUTO_INCREMENT,
                       title VARCHAR(255) NULL,
                       author VARCHAR(255) NULL,
                       publicationYear INT NULL
);
CREATE TABLE book_reviews (
                              reviewId INT PRIMARY KEY AUTO_INCREMENT,
                              bookId INT NULL,
                              rating INT NULL,
                              review VARCHAR(250) NULL,
                              FOREIGN KEY (bookId) REFERENCES Books(bookId)
);
//drop foreign key
ALTER TABLE book_reviews DROP FOREIGN KEY book_reviews_ibfk_1;
//drop constrains
ALTER TABLE books DROP book_reviews_ibfk_1;

//select constrain name
SELECT CONSTRAINT_NAME, CONSTRAINT_TYPE FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE TABLE_NAME = 'books';



