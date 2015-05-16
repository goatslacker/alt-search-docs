import React from 'react'
import AltContainer from 'alt/AltContainer'
import SearchStore from '../stores/SearchStore'
import SearchBox from './SearchBox'
import SearchResults from './SearchResults'

class SearchView extends React.Component {
  componentDidMount() {
    SearchStore.loadIndex()
  }

  render() {
    return (
      <div>
        <SearchBox />
        <AltContainer store={SearchStore}>
          <SearchResults />
        </AltContainer>
      </div>
    )
  }
}

export default SearchView
