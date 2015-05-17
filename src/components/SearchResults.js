import React, { PropTypes } from 'react'
import TextHighlight from 'react-text-highlight'
import classnames from 'classnames'

class SearchResults extends React.Component {
  static propTypes = {
    searchTerm: PropTypes.string.isRequired,
    results: PropTypes.array.isRequired
  }

  render() {
    return (
      <div className="alt-search__results">
        {this.props.results.map((result, i) => {
          const classes = classnames({
            'alt-search__result': true,
            'selected': result.selected
          })

          return (
            <div key={i} className={classes}>
              <h3 className="alt-search__result-title">
                <a href={result.permalink}>
                  <TextHighlight
                    highlight={this.props.searchTerm}
                    text={`${result.description} - ${result.title}`}
                  />
                </a>
              </h3>
              <p className="alt-search__result-snippet">
                <TextHighlight
                  highlight={this.props.searchTerm}
                  text={result.snippet}
                />
              </p>
              <h5 className="alt-search__result-link">{result.permalink}</h5>
            </div>
          )
        })}
      </div>
    )
  }
}

export default SearchResults
