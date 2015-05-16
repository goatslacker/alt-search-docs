import React, { PropTypes } from 'react'
import TextHighlight from './TextHighlight'

class SearchResults extends React.Component {
  static propTypes = {
    searchTerm: PropTypes.string.isRequired,
    results: PropTypes.array.isRequired
  }

  render() {
    return (
      <div className="alt-search__results">
        {this.props.results.map((result, i) => {
          return (
            <div key={i} className="alt-search__result">
              <h3 className="alt-search__result-title">
                <a href={result.permalink}>
                  <TextHighlight
                    highlight={this.props.searchTerm}
                    text={result.description}
                  />
                  {' - '}
                  {result.title}
                </a>
              </h3>
              <p className="alt-search__result-snippet">
                <TextHighlight
                  highlight={this.props.searchTerm}
                  text={result.snippet}
                />
              </p>
              <h5 className="alt-search__result-link">{result.permalink}</h5>
              <hr />
            </div>
          )
        })}
      </div>
    )
  }
}

export default SearchResults
