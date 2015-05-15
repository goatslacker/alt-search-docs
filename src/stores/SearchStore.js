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
    this.index = lunr(function () {
      this.field('title', { boost: 10 })
      this.field('description', { boost: 5 })
      this.field('body')
      this.field('layout')
      this.field('permalink')
    })

    this.results = []

    // XXX load in from localforage first...
    // when teh async request comes back if its different than local storage
    // then load it in otherwise return false.
  }

  @bind(SearchActions.receivedIndex)
  receivedIndex(json) {
    console.log(this.index)
    this.index.load(json)
  }

  @bind(SearchActions.noIndexFound)
  failedLoadingIndex(err) {
    console.log('Uh oh', err)
    // throw an error?
  }

  @bind(SearchActions.search)
  search(text = '') {
    this.results = this.index.search(text)
  }
}

export default alt.createStore(SearchStore)
