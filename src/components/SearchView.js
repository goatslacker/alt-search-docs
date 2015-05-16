import React, { PropTypes } from 'react'
import AltContainer from 'alt/AltContainer'
import SearchStore from '../stores/SearchStore'
import SearchActions from '../actions/SearchActions'
import TextHighlight from './TextHighlight'

import stringScore from '../utils/stringScore'

//import TextHighlight from 'react-text-highlight'

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
    searchTerm: PropTypes.string.isRequired,
    results: PropTypes.array.isRequired
  }

  findText(tokens, text) {
    const items = tokens.map((token) => {
      return { score: stringScore(token.text, text), text: token.text }
    }).filter((obj) => {
      return obj.score > 0
    }).sort((a, b) => {
      return a.score < b.score ? 1 : -1
    })

    return items.length ? items[0].text.slice(0, 240) : ''
  }

  render() {
    return (
      <div>
        {this.props.results.map((result, i) => {
          return (
            <div key={i} className="alt-search-result">
              <h3>
                <a href={result.permalink}>
                  <TextHighlight
                    highlight={this.props.searchTerm}
                    text={result.description}
                  />
                  {' - '}
                  {result.title}
                </a>
              </h3>
              <p>
                <TextHighlight
                  highlight={this.props.searchTerm}
                  text={this.findText(result.tokens, this.props.searchTerm)}
                />
              </p>
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
