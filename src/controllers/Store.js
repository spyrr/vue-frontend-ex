import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const API_ADDR = (() => {
  let rv = 'http://localhost:18888'

  if(typeof process.env.API_HOST !== 'undefined') {
    rv += `${process.env.API_HOST}:${process.env.API_PORT}`
  }
  return rv
})()

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    books: [{
      // <id> : {
      //   title: <title>,
      //   author: <author>,
      //   isActive: <true or false>
      // }
    }],
    sidebar: {
      isOpen: false,
      id: '',
      title: '',
      author: '',
      caption: 'New',
    },
  },
  mutations: {
    setBooks: function (state, books) {
      state.books = books
    },
    openSidebar: function (state) {
      state.sidebar.isOpen = true
    },
    closeSidebar: function (state) {
      state.sidebar.isOpen = false
    },
    setSidebar: function (state, book) {
      state.sidebar = {
        ...state.sidebar,
        ...book
      }
    }
  },
  getters: {
    book: function (state, id) {
      return state.books[id]
    },
    allBooks: function (state) {
      return state.books
    },
    sidebar: function (state) {
      return state.sidebar
    },
    sidebarState: function (state) {
      return state.sidebar.isOpen
    }
  },
  actions: {
    newBook: async function (context, book) {
      await axios.post(`${API_ADDR}/api/v1/books`, {
        title: book.title, author: book.author
      })
      context.dispatch('reset')
    },
    updateBook: async function (context, book) {
      await axios.put(`${API_ADDR}/api/v1/books/${book.id}`, {
        title: book.title, author: book.author
      })
      context.dispatch('reset')
    },
    reset: async function (context) {
      const res = await axios.get(`${API_ADDR}/api/v1/books`)
      context.commit('setBooks', res.data)
    },
    setSidebar: function (context, book) {
      context.commit('setSidebar', book)
    },
    openSidebar: function (context) {
      context.commit('openSidebar')
    },
    closeSidebar: function (context) {
      context.commit('closeSidebar')
    },
  },
})
