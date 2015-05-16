import React, { PropTypes } from 'react'
import TextHighlight from './TextHighlight'

import stringScore from '../utils/stringScore'

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

export default SearchResults
