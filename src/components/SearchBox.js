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

  parseKeyCode(ev) {
    const { keyCode } = ev
    if (keyCode === 38 || keyCode === 40 || keyCode === 13) {
      ev.preventDefault()
      if (keyCode === 13) {
        SearchActions.go()
      } else {
        SearchActions.select(keyCode === 40 ? 'down' : 'up')
      }
    }
  }

  render() {
    return (
      <input
        className="alt-search__input"
        type="text"
        value={this.state.value}
        onKeyDown={(ev) => this.parseKeyCode(ev)}
        onChange={(ev) => this.setState({ value: ev.target.value })}
      />
    )
  }
}

export default SearchBox
