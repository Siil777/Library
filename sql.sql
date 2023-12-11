
CREATE TABLE books (
                       bookId INT PRIMARY KEY AUTO_INCREMENT,
                       title VARCHAR(255),
                       author VARCHAR(255),
                       publicationYear INT,

);


CREATE TABLE book_reviews (
                              reviewId INT PRIMARY KEY AUTO_INCREMENT,
                              bookId INT,
                              rating INT,
                              review VARCHAR(250),
                              FOREIGN KEY (bookId) REFERENCES Books(bookId)
);

CREATE TABLE books (
                       bookId INT PRIMARY KEY AUTO_INCREMENT,
                       title VARCHAR(255) NOT NULL,
                       author VARCHAR(255) NOT NULL,
                       publicationYear INT NOT NULL
);
CREATE TABLE book_reviews (
                              reviewId INT PRIMARY KEY AUTO_INCREMENT,
                              bookId INT NOT NULL,
                              rating INT NOT NULL,
                              review VARCHAR(250) NOT NULL,
                              FOREIGN KEY (bookId) REFERENCES Books(bookId)
);
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



