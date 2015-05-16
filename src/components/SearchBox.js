import React from 'react'
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
        className="alt-search__input"
        type="text"
        value={this.state.value}
        onChange={(ev) => this.setState({ value: ev.target.value })}
      />
    )
  }
}

export default SearchBox
