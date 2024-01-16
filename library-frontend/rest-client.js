const app = Vue.createApp({
    data() {
        return {
            bookInModal: { name :null},
           
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
            this.bookInModal = await (await fetch(`http://localhost:8080/books/${id}`)).json();
            let bookInfoModal = new bootstrap.Modal(document.getElementById('bookInfoModal'), {});
            bookInfoModal.show();
        }
    }
}); 

 app.mount('#app');  

const ClientTable = Vue.createApp({
    data() {
        return {
            clientInModal: { Name: null},
            clients: [],  
        };
    },
    async created() {
        console.log('Fetching clients...');
        try {
            this.clients = await (await fetch('http://localhost:8080/clients')).json();
            console.table('Clients fetched successfully:', this.clients); 
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    },
    
    
    methods: {
        async getClient(id) {
            if (id !== undefined) {
                try {
                    this.clientInModal = await (await fetch(`http://localhost:8080/clients/${id}`)).json();
                    let ClientInfoModal = new bootstrap.Modal(document.getElementById('ClientInfoModal'), {});
                    ClientInfoModal.show();
                } catch (error) {
                    console.error('Error fetching client details:', error);
                }
            }
        }
    }
    
});

ClientTable.mount('#appClient'); 
