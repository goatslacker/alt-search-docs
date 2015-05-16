import alt from '../alt'
import { decorate, datasource, bind } from 'alt/utils/decorators'
import SearchActions from '../actions/SearchActions'
import SearchStore from '../stores/SearchStore'
import stringScore from '../utils/stringScore'

const MAX_CHAR_SUMMARY = 240

@decorate(alt)
class SearchResultsStore {
  static displayName = 'SearchResultsStore'

  constructor() {
    this.searchTerm = ''
    this.results = []
  }

  @bind(SearchActions.search)
  search(text = '') {
    this.searchTerm = text
    this.results = text ? this.doSearch(text) : []
  }

  getSnippet(tokens) {
    const text = this.searchTerm
    const items = tokens.map((token) => {
      return {
        score: stringScore(token.text, text),
        text: token.text
      }
    }).filter((obj) => {
      return obj.score > 0
    }).sort((a, b) => {
      return a.score < b.score ? 1 : -1
    })

    return items.length ? items[0].text.slice(0, MAX_CHAR_SUMMARY) : ''
  }

  doSearch(text) {
    const { index, documents } = SearchStore.getState()

    // Search and return the top 10 documents
    return index.search(text).map((result) => {
      const doc = documents[result.ref]
      doc.snippet = this.getSnippet(doc.tokens)
      return doc
    }).slice(0, 10)
  }
}

export default alt.createStore(SearchResultsStore)
