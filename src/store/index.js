import Vue from 'vue'
import Vuex from 'vuex'
import BookStore from './book'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    book: BookStore
  }
})