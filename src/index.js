import React from 'react'
import SearchView from './components/SearchView'
import es6Promise from 'es6-promise'

es6Promise.polyfill()

React.render(<SearchView />, document.getElementById('alt-search-app'))
