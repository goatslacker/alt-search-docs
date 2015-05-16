import lunr from 'lunr'

import alt from '../alt'
import { decorate, datasource, bind } from 'alt/utils/decorators'
import SearchSource from '../sources/SearchSource'
import SearchActions from '../actions/SearchActions'
import marked from '../utils/marked'


@decorate(alt)
@datasource(SearchSource)
class SearchStore {
  static displayName = 'SearchStore'

  static config = {
    // XXX
    onSerialize(state) {
      return state.index.toJSON()
    }
  }

  constructor() {
//    console.log('@@@@@@@@@@@@', module.hot)
    // XXX load in from localforage first...
    // when teh async request comes back if its different than local storage
    // then load it in otherwise return false.
    this.index = null
    this.documents = []
  }

  @bind(SearchActions.receivedIndex)
  receivedIndex(json) {
    console.info('@', json)
    this.documents = json.docs.reduce((obj, doc) => {
      obj[doc.id] = doc
      doc.tokens = marked.lexer(doc.body).filter((tokens) => {
        return tokens.type === 'paragraph'
      })
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

//  @bind(SearchActions.search)
//  search(text = '') {
//    this.results = text ? this.doSearch(text) : []
//    this.searchTerm = text
//  }

//  doSearch(text) {
    // Search and return the top 10 documents
//    return this.index.search(text).map((result) => {
//      return this.documents[result.ref]
//    }).slice(0, 10)
//  }
}

export default alt.createStore(SearchStore)
