import './search.css'

import React from 'react'
import SearchView from './components/SearchView'
import es6Promise from 'es6-promise'

es6Promise.polyfill()

class App extends React.Component {
  render() {
    return <SearchView url={this.props.url} />
  }
}

if (typeof window !== 'undefined') {
  window.AltSearchTest = () => {
    React.render(
      <App url="assets/search.json" />,
      document.getElementById('alt-search-app')
    )
  }
}

export default App
