<template>
  <div>
    <b-table
      :items="books"
      :fields="fields"
      striped hover 
      @row-clicked="viewDetails"
    ></b-table>
    <b-button variant="primary" @click="addBook" block>New book</b-button>
  </div>
</template>

<style scoped>
  .btn-block {
    display: block;
    width: 100%;
  }
</style>

<script>
import books from '../controllers/books'
import eventBus from '../controllers/eventBus'

export default {
  data() {
    return {
      fields: [
        {key: 'id', label: 'ID', sortable: true},
        {key: 'title', label: 'Title', sortable: true},
        {key: 'author', label: 'Author', sortable: true}
      ],
      books: []
    }
  },
  methods: {
    async getBooks() {
      this.books = await books.getAll()
    },
    viewDetails(obj) {
      eventBus.$emit(eventBus.evtList.sidebar.viewDetails, obj)
    },
    addBook() {
      eventBus.$emit(eventBus.evtList.sidebar.newBook)
    },
  },
  async created() {
    eventBus.$on(eventBus.evtList.books.getBooks, async () => {
      await this.getBooks()
    })

    await this.getBooks()
  },
}
</script>