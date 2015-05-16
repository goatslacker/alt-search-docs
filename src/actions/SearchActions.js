import alt from '../alt'

class SearchActions {
  static displayName = 'SearchActions'

  constructor() {
    this.generateActions(
      'go',
      'noIndexFound',
      'receivedIndex',
      'search',
      'select'
    )
  }
}

export default alt.createActions(SearchActions)
