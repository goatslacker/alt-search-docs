import alt from '../alt'
import { decorate, datasource, bind } from 'alt/utils/decorators'
import SearchActions from '../actions/SearchActions'
import SearchStore from '../stores/SearchStore'
import stringScore from '../utils/stringScore'

const MAX_CHAR_SUMMARY = 240

@decorate(alt)
class ResultsStore {
  static displayName = 'ResultsStore'

  constructor() {
    this.searchTerm = ''
    this.results = []
  }

  @bind(SearchActions.search)
  search(text = '') {
    this.searchTerm = text
    this.results = text ? this.doSearch(text) : []
  }

  @bind(SearchActions.select)
  select(dir) {
    const length = this.results.length

    if (!length) {
      return false
    }

    for (let i = 0; i < length; i += 1) {
      let result = this.results[i]
      const { selected } = result
      result.selected = false
      if (selected) {
        if (dir === 'down') {
          const selectIndex = i < length - 1 ? i + 1 : 0
          return this.results[selectIndex].selected = true
        } else {
          const selectIndex = i > 0 ? i - 1 : length - 1
          return this.results[selectIndex].selected = true
        }
      }
    }

    if (dir === 'down') {
      this.results[0].selected = true
    } else {
      this.results[length - 1].selected = true
    }
  }

  @bind(SearchActions.go)
  followSelected() {
    const result = this.results.filter((x) => x.selected)[0] || this.results[0]
    window.location = result.permalink
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
      doc.selected = false
      return doc
    }).slice(0, 10)
  }
}

export default alt.createStore(ResultsStore)
