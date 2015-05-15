import alt from '../alt'

class SearchActions {
  static displayName = 'SearchActions'

  constructor() {
    this.generateActions('receivedIndex', 'noIndexFound')
  }
}

export default alt.createActions(SearchActions)
