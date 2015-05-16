import React from 'react'
import AltContainer from 'alt/AltContainer'
import SearchStore from '../stores/SearchStore'
import ResultsStore from '../stores/ResultsStore'
import SearchBox from './SearchBox'
import SearchResults from './SearchResults'

class SearchView extends React.Component {
  componentDidMount() {
    SearchStore.loadIndex()
  }

  render() {
    return (
      <div className="alt-search">
        <SearchBox />
        <AltContainer store={ResultsStore}>
          <SearchResults />
        </AltContainer>
      </div>
    )
  }
}

export default SearchView
