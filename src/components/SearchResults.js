import React, { PropTypes } from 'react'
import TextHighlight from './TextHighlight'

class SearchResults extends React.Component {
  static propTypes = {
    searchTerm: PropTypes.string.isRequired,
    results: PropTypes.array.isRequired
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
                  text={result.snippet}
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
