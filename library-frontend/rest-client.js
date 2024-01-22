const app = Vue.createApp({
    data() {
        return {
            bookInModal: { name :null,},
           
            books: [],
        };
    },
    async created() {
        // array of books
        this.books = await (await fetch('http://localhost:8080/books')).json();
        console.log(`${this.books}`);

    },    
    methods: {
        async getBook(id) {
            console.log('Clicked book ID:', id);
            if (!isNaN(id) && id !== null) {
                this.bookInModal = await (await fetch(`http://localhost:8080/books/${id}`)).json();
                console.log('Book Details:', this.bookInModal);
                let bookInfoModal = new bootstrap.Modal(document.getElementById('bookInfoModal'), {});
        
                await bookInfoModal.show();
            } else {
                console.error('Invalid book id:', id);
            }
        }
        
        
        
    }
});

 app.mount('#app');  

 const ClientTable = Vue.createApp({
    data() {
        return {
            clientInModal: { name: null },
            clients: [],
        };
    },
    async created() {
        console.log('Fetching clients...');
        try {
            this.clients = await (await fetch('http://localhost:8080/clients')).json();
            console.log('Clients fetched successfully:', this.clients);
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    },
    
    methods: {
        async getClient(id) {
            this.clientInModal = await (await fetch(`http://localhost:8080/clients/${id}`)).json();
            let ClientInfoModal = new bootstrap.Modal(document.getElementById('ClientInfoModal'), {});
            ClientInfoModal.show();
        }
    }
});

ClientTable.mount('#appClient');



const BorrowingBooks = Vue.createApp({
    data() {
        return {
            borrowInModal: { id_book: null },
            BorrowingBook: [],
        };
    },
    async created() {
        console.log('Fetching clients...');
        try {
            const response = await fetch('http://localhost:8080/borrowing');
            const textData = await response.text();
            console.log('Response from server:', textData);

            try {
                const data = JSON.parse(textData);
                console.log('BorrowingBook fetched successfully:', data);
                this.BorrowingBook = data;
            } catch (jsonError) {
                console.error('Error parsing JSON:', jsonError);
                throw jsonError; // Propagate the error for better debugging
            }
        } catch (error) {
            console.error('Error fetching BorrowingBook:', error);
        }
    }, 
    methods: {
        async getBorrowBook(id) {
            try {
                const response = await fetch(`http://localhost:8080/borrowing/${id}`);
                this.borrowInModal = await response.json();
                let BorrowBookInfoModal = new bootstrap.Modal(document.getElementById('BorrowBookInfoModal'), {});
                BorrowBookInfoModal.show();
            } catch (error) {
                console.error('Error fetching BorrowBook by ID:', error);
            }
        }
    }
});

BorrowingBooks.mount('#appBorrowingBook');


