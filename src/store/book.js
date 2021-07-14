import axios from 'axios'

const API_ADDR = 'http://localhost/api/v1'

const state = {
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
}

const mutations = {
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
}

const getters = {
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
}

const actions = {
  newBook: async function (context, book) {
    await axios.post(`${API_ADDR}/books`, {
      title: book.title, author: book.author
    })
    context.dispatch('reset')
  },
  updateBook: async function (context, book) {
    await axios.put(`${API_ADDR}/books/${book.id}`, {
      title: book.title, author: book.author
    })
    context.dispatch('reset')
  },
  reset: async function (context) {
    const res = await axios.get(`${API_ADDR}/books`)
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
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}