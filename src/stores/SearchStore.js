import alt from '../alt'
import { decorate, datasource, bind } from 'alt/utils/decorators'
import SearchSource from '../sources/SearchSource'
import SearchActions from '../actions/SearchActions'

import lunr from 'lunr'

@decorate(alt)
@datasource(SearchSource)
class SearchStore {
  static displayName = 'SearchStore'

  static config = {
    onSerialize(state) {
      return state.index.toJSON()
    }
  }

  constructor() {
//    console.log('@@@@@@@@@@@@', module.hot)
    this.index = null
    this.results = []

    // XXX load in from localforage first...
    // when teh async request comes back if its different than local storage
    // then load it in otherwise return false.
  }

  @bind(SearchActions.receivedIndex)
  receivedIndex(json) {
    this.index = lunr.Index.load(json)
  }

  @bind(SearchActions.noIndexFound)
  failedLoadingIndex(err) {
    console.log('Uh oh', err)
    // throw an error?
  }

  @bind(SearchActions.search)
  search(text = '') {
    this.results = this.index.search(text)
    console.log(this.results)
  }
}

export default alt.createStore(SearchStore)
