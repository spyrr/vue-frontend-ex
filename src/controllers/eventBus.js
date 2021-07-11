// TODO: Change eventBus to Vuex
import Vue from 'vue'

const getEventString = (events) => {
  const EVTPREFIX = 'customevents_x89f81'
  let rv = {}

  for(let receiver in events) {
    rv[receiver] = {}

    events[receiver].map((evt) => {
      rv[receiver][evt] = `${EVTPREFIX}::${receiver}::${evt}`
    })
  }
  return rv
}

const eventBus = new Vue()

eventBus.evtList = getEventString({
  sidebar: [
    'viewDetails',
    'newBook'
  ],
  books: [
    'getBooks'
  ]
})

export default eventBus