<template>
  <div>
    <b-sidebar id="sidebar-footer"
      :aria-label="ariaLabel"
      :title="sidebar.id"
      :backdrop-variant="variant"
      v-model="sidebar.isOpen"
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
          <b-form-input v-if='o.label === "Title"' :id="o.inputId" trim
            v-model="sidebar.title"
          ></b-form-input>
          <b-form-input v-if='o.label === "Author"' :id="o.inputId" trim
            v-model="sidebar.author"
          ></b-form-input>
        </b-form-group>
      </div>

      <div class="px-2 py-3">
        <b-button block
          variant="danger"
          @click="btnUpdateBook"
        >{{sidebar.caption}}</b-button>
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
import { mapGetters, } from 'vuex'

export default {
  name: "sidebar",
  data() {
    return {
      variant: 'dark',
      ariaLabel: 'Book ID',
      forms: [
        {
          groupId: 'field-title',
          description: 'Let us know book title.',
          label: 'Title',
          inputId: 'input-title',
        },
        {
          groupId: 'field-author',
          description: 'Let us know the author.',
          label: 'Author',
          inputId: 'input-author',
        },
      ],
    }
  },
  methods: {
    btnUpdateBook() {
      let sidebar = this.$store.getters.sidebar
      let book = {id: sidebar.id, title: sidebar.title, author: sidebar.author}

      if(sidebar.caption === 'Add') {
        this.$store.dispatch('newBook', book)
      } else if(sidebar.caption === 'Update') {
        this.$store.dispatch('updateBook', book)
      }
      this.$store.dispatch('closeSidebar')
    },
  },
  computed: {
    ...mapGetters({
      isOpen: 'sidebarState',
      sidebar: 'sidebar',
    }),
  },
  created () {
    this.forms[0].vmodel = ''
    this.forms[1].vmodel = ''
  },
}
</script>