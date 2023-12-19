const app = Vue.createApp({
    data() {
        return {
            bookInModal: { name: null },
            books: [],
        };
    },
    async created() {
        //array of books
        this.books = await (await fetch('http://localhost:8080/books')).json();
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
