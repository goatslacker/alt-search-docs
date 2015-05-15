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

// XXX include css styles with this component using webpack
// or maybe inline them in JS, idk.
class SearchResults extends React.Component {
  static propTypes = {
    results: PropTypes.array.isRequired
  }

  render() {
    return (
      <div>
        {this.props.results.map((result, i) => {
          return (
            <div key={i} className="alt-search-result">
              <h2>
                <a href={result.permalink}>{result.title}</a>
              </h2>
              <h3>{result.description}</h3>
              <h5>{result.permalink}</h5>
              <hr />
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
