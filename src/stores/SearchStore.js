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

  constructor() {
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
  }

  @bind(SearchActions.noIndexFound)
  failedLoadingIndex(err) {
    this.index = null
    console.error(err)
  }
}

export default alt.createStore(SearchStore)
