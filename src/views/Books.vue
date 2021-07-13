<template>
  <div>
    <b-table
      :items="books"
      :fields="fields"
      striped hover 
      @row-clicked="btnViewDetails"
    ></b-table>
    <b-button variant="primary" @click="btnNewBook" block>New book</b-button>
  </div>
</template>

<style scoped>
  .btn-block {
    display: block;
    width: 100%;
  }
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      fields: [
        {key: 'id', label: 'ID', sortable: true},
        {key: 'title', label: 'Title', sortable: true},
        {key: 'author', label: 'Author', sortable: true}
      ],
    }
  },
  methods: {
    btnViewDetails(book) {
      this.$store.dispatch('setSidebar', {...book, caption: 'Update'})
      this.$store.dispatch('openSidebar')
    },
    btnNewBook() {
      this.$store.dispatch('setSidebar', {
        id: 'New book', title: '', author: '', caption: 'Add'
      })
      this.$store.dispatch('openSidebar')
    }
  },
  computed: mapGetters({
    books: 'allBooks'
  }),
  created () {
    this.$store.dispatch('reset')
  },
}
</script>