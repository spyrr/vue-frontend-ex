import axios from 'axios'

const API_ADDR = (() => {
  let rv = 'http://localhost:18888'
  if(typeof process.env.API_HOST !== 'undefined') {
    rv += `${process.env.API_HOST}:${process.env.API_PORT}`
  }
  return rv
})()

export default {
  getAll: async () => {
    const res = await axios.get(`${API_ADDR}/api/v1/books`)
    let rv = res.data.map(obj => {
      return {id: obj.id, author: obj.author, title: obj.title, isActive: true}
    })
    return rv
  },
  newBook: async (title, author) => {
    const res = await axios.post(
      `${API_ADDR}/api/v1/books`,
      {title: title, author: author}
    )
    return res.status
  },
  updateBook: async (id, title, author) => {
    const res = await axios.put(
      `${API_ADDR}/api/v1/books/${id}`,
      {title: title, author: author}
    )
    return res.status
  }
}
