import alt from '../alt'
import { decorate, datasource, bind } from 'alt/utils/decorators'
import SearchSource from '../sources/SearchSource'
import SearchActions from '../actions/SearchActions'

@decorate(alt)
@datasource(SearchSource)
class SearchStore {
  static displayName = 'SearchStore'

  constructor() {
    // XXX
    // * load from localstorage first
    this.index = '{}'
  }

  @bind(SearchActions.receivedIndex)
  receivedIndex(json) {
    // if remote === local then do nothing
    // otherwise update in store and in localstorage
  }

  @bind(SearchActions.noIndexFound)
  failedLoadingIndex() {
    // throw an error?
  }
}

export default alt.createStore(SearchStore)
