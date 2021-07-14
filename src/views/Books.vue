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
import { mapGetters, mapActions } from 'vuex'

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
    ...mapActions('book', [
      'reset', 'setSidebar', 'openSidebar', 'closeSidebar'
    ]),
    btnViewDetails(book) {
      this.setSidebar({...book, caption: 'Update'})
      this.openSidebar()
    },
    btnNewBook() {
      this.setSidebar({id: 'New book', title: '', author: '', caption: 'Add'})
      this.openSidebar()
    }
  },
  computed: mapGetters('book', {
    books: 'allBooks'
  }),
  created () {
    this.reset()
  },
}
</script>