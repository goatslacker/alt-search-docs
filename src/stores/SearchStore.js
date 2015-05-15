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
    this.documents = {}

    // XXX load in from localforage first...
    // when teh async request comes back if its different than local storage
    // then load it in otherwise return false.
  }

  @bind(SearchActions.receivedIndex)
  receivedIndex(json) {
    console.info('@', json)
    this.documents = json.docs.reduce((obj, doc) => {
      obj[doc.id] = doc
      return obj
    }, {})
    this.index = lunr.Index.load(json.index)
//    console.info('+>', this.index)
  }

  @bind(SearchActions.noIndexFound)
  failedLoadingIndex(err) {
    console.info('Uh oh', err)
    // throw an error?
  }

  @bind(SearchActions.search)
  search(text = '') {
    this.results = text ? this.doSearch(text) : []
    console.info(this.results)
  }

  doSearch(text) {
    return this.index.search(text).map((result) => {
      return this.documents[result.ref]
    })
  }
}

export default alt.createStore(SearchStore)
