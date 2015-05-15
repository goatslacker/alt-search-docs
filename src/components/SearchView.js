import React, { PropTypes } from 'react'
import AltContainer from 'alt/AltContainer'
import SearchStore from '../stores/SearchStore'
import SearchActions from '../actions/SearchActions'

class SearchBox extends React.Component {
  constructor() {
    super()

    this.state = { value: '' }
  }

  componentDidUpdate() {
    SearchActions.search(this.state.value)
  }

  render() {
    return (
      <input
        type="text"
        value={this.state.value}
        onChange={(ev) => this.setState({ value: ev.target.value })}
      />
    )
  }
}

class SearchResults extends React.Component {
  static propTypes = {
    results: PropTypes.array.isRequired
  }

  render() {
    return (
      <div>
        {this.props.results.map((result, i) => {
          return (
            <div key={i}>
              <strong>{result.ref}</strong>
            </div>
          )
        })}
      </div>
    )
  }
}

class SearchView extends React.Component {
  componentWillMount() {
    SearchStore.listen((state) => {
      console.log('@', state)
    })

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
