<template>
  <div>
    <b-sidebar id="sidebar-footer"
      :aria-label="ariaLabel"
      :title="id"
      :backdrop-variant="variant"
      v-model="sidebarState"
      right shadow 
    >
      <template #footer="{ hide }">
        <b-button block @click="hide">Close</b-button>
      </template>

      <div class="px-2 py-3" v-for="o in forms" v-bind:key="o.groupId">
        <b-form-group :id="o.groupId"
          :description="o.description"
          :label="o.label"
          :label-for="o.inputId"
        >
          <b-form-input :id="o.inputId" trim
            v-model="o.vmodel"
          ></b-form-input>
        </b-form-group>
      </div>

      <div class="px-2 py-3">
        <b-button block variant="danger" @click="updateBook">{{btnUpNewCaption}}</b-button>
      </div>
    </b-sidebar>
  </div>
</template>
 
<style scoped>
  .btn-block {
    display: block;
    width: 100%;
  }
</style>

<script>
import eventBus from '../../controllers/eventBus'
import books from '../../controllers/books'

export default {
  name: "sidebar",
  data() {
    return {
      variant: 'dark',
      ariaLabel: 'Book ID',
      id: 'ex id',
      sidebarState: false,
      btnUpNewCaption: 'Add',
      forms: [
        {
          groupId: 'field-title',
          description: 'Let us know book title.',
          label: 'Title',
          inputId: 'input-title',
          vmodel: 'title',
        },
        {
          groupId: 'field-author',
          description: 'Let us know the author.',
          label: 'Author',
          inputId: 'input-author',
          vmodel: 'author',
        },
      ],
    }
  },
  methods: {
    async updateBook() {
      ({
        Add: async() => {
          const rv = await books.newBook(
            this.forms[0].vmodel, this.forms[1].vmodel
          )
          console.log('The result of adding : ', rv)
          eventBus.$emit('books:getBooks')
          this.sidebarState = false
        },
        Update: async() => {
          const rv = await books.updateBook(
            this.id, this.forms[0].vmodel, this.forms[1].vmodel
          )
          console.log('The result of update : ', rv)
          eventBus.$emit('books:getBooks')
        }
      })[this.btnUpNewCaption]()
    },
    async newBook() {
      this.id = 'New book'
      this.forms[0].vmodel = ''
      this.forms[1].vmodel = ''
      this.btnUpNewCaption = 'Add'
      this.sidebarState = true
    },
    async viewDetails(obj) {
      this.id = obj.id
      this.forms[0].vmodel = obj.title
      this.forms[1].vmodel = obj.author
      this.btnUpNewCaption = 'Update'
      this.sidebarState = true
    },
  },
  async created() {
    eventBus.$on('sidebar:viewDetails', (obj) => {
      this.viewDetails(obj)
    })
    eventBus.$on('sidebar:newBook', () => {
      this.newBook()
    })
  },
}
</script>