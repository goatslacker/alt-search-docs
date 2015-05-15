import React from 'react'
import AltContainer from 'alt/AltContainer'
import SearchStore from '../stores/SearchStore'

// XXX use autobind decorator?

class SearchView extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    SearchStore.listen((state) => {
      console.log('@', state)
    })

    SearchStore.loadIndex()
  }

  render() {
    return (
      <div>
        <input type="text" />
      </div>
    )
  }
}

export default SearchView
